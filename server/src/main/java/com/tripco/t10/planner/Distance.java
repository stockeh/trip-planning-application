package com.tripco.t10.planner;

import java.util.ArrayList;
import java.lang.Math;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.IntStream;

/**
 * The Distance class is responsible for calculating the distance between
 * two decimal coordinates.
 */
public class Distance {
  // Defining variables and constructors
  public Option options;
  public String distance;
  public double optimization;
  public int[][] memo;
  public int[] placesIndex;

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers".
   *
   * @param option the options in the trip.
   * @see Trip class for trip variables.
   */
  public Distance(Option option) {
    options = option;
  }

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers" and the level of optimization for the trip
   * Optimization level can be 0 1 2 3
   * @param distance the units in the trip.
   * @param optimization level for the trip
   * @see Trip class for trip variables.
   */
  public Distance(String distance, String optimization){
    this.options.distance = distance.toLowerCase();
    this.options.optimization = optimization;
  }

  /**
   * Takes in options.distance and returns the corresponding radius for the units
   * @param distance unit or user defined
   */
  public double getRadius(String distance) {
    double radius;
    switch (distance) {
      case "kilometers":
        radius = 6371.0088;
        break;
      case "nautical miles":
        radius = 3440.0695;
        break;
      case "user defined":
        radius = Double.parseDouble(this.options.userRadius);
        break;
      default:
        radius = 3958.7613; // miles
    }
    return radius;
  }

  /**
   * Inserts the computed distance into the 2D array.
   * Note that A to B is that same as B to A.
   * @param degrees an array list of decimal degrees.
   * @param from current starting A in array.
   * @param too index of the destination to compute distance too.
   */
  public void memoizeInsert(ArrayList<Double> degrees, int from, int too) {
    if (too >= from) {
      memo[from][too] = greatCirDist(degrees.get(from * 2), degrees.get(from * 2 + 1),
              degrees.get(too * 2), degrees.get(too * 2 + 1));
      memo[too][from] = memo[from][too];
    }
  }

  /**
   * Populates a 2D array to memoize the distances between locations.
   * Computing distance between 0-n for each n.
   * @param degrees an array list of decimal degrees.
   */
  public void memoizeDistance(ArrayList<Double> degrees, int size) {
    memo = new int[size][size];

    for (int i = 0; i < size; i++) {
      for (int j = 0; j < size; j++) {
        memoizeInsert(degrees, i, j);
      }
    }
  }

  /**
   * Swaps the values at the index defined by first and second.
   * @param arr is the array whose values are to be swapped.
   * @param first index to swap.
   * @param second second index that was swapped.
   */
  public void swap(int[] arr, int first, int second){
    int temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }

  /**
   * Constructs the nearest neighbor from a given starting location.
   * Returning the total cumulative distance between all of the destinations,
   * including the one back "home" - completing a round trip.
   * @param placesIndexCopy is the array to be re organized to represent the route.
   * @param size is the number of elements in the array.
   * @return Returns a integer of the total cumulative distance.
   */
  public int constructNearestNeighbor(int[] placesIndexCopy, int size) {
    int src;
    int nearestSrc;
    int temp;
    int cumulativeDist = 0;
    Integer minimum = Integer.MAX_VALUE;
    for (int index = 0; index < size; ++index) {
      for (int dest = index + 1; dest < size; ++dest) {
        src = placesIndexCopy[index];
        nearestSrc = placesIndexCopy[dest];
        temp = memo[src][nearestSrc];
        if (minimum > temp) {
          minimum = temp;
          this.swap(placesIndexCopy, index + 1, dest);
        }
      }
      if (index + 1 < size) {
        cumulativeDist += minimum;
      }
      minimum = Integer.MAX_VALUE;
    }
    cumulativeDist += memo[placesIndexCopy[size-1]][placesIndexCopy[0]];
    return cumulativeDist;
  }

  /**
   * Compute the nearest neighbor between all given places.
   * Iterates over every starting point, comparing the total trip distances with others.
   * @see #constructNearestNeighbor(int[], int) which compute the individual cumulative distance
   *     then also rearanges the int[] to represent the indicies of the places.
   * @see #rotateArray(int[], int[], int, int) rotates the origional array to test from each start.
   * @see #nearestOutput(ArrayList, int) formats the output to return an ArrayList of distances.
   *     Also rearanges the places ArrayList of Places.
   * @param degrees the converted decimal degrees of coordinates.
   * @param places is the arrayList of place objects to be rearranged.
   * @return the an arrayList containing the ordered distances.
   */
  public ArrayList<Integer> nearestNeighbor(ArrayList<Double> degrees, ArrayList<Place> places) {
    // Initialize Globals.
    int size = degrees.size()/2;
    this.memoizeDistance(degrees, size);
    placesIndex = IntStream.range(0, places.size()).toArray();
    int[] placesIndexOriginal = placesIndex.clone();
    int[] placesIndexCopy = placesIndex.clone();
    int currCumulDist;
    int totalCumulDist = 0;
    int start = 0;

    while (start < size) {
      currCumulDist = this.constructNearestNeighbor(placesIndexCopy, size);
      if (start++ == 0) {
        totalCumulDist = currCumulDist;
        placesIndex = placesIndexCopy.clone();
      }
      if (currCumulDist < totalCumulDist) {
        totalCumulDist = currCumulDist;
        placesIndex = placesIndexCopy.clone();
      }
      rotateArray(placesIndexCopy, placesIndexOriginal, start, size);
    }

    return nearestOutput(places, size);
  }

  /**
   * Rotates one array by start positions and stores it into another.
   * @param placesIndexCopy the array to copy over to.
   * @param placesIndexOriginal the array that is being copied from.
   * @param start n indices to shift array.
   * @param size is the number of elements in the array.
   */
  public void rotateArray(int[] placesIndexCopy, int[] placesIndexOriginal, int start, int size) {
    for (int i = 0; i < size; i++) {
      placesIndexCopy[i] = placesIndexOriginal[(i + start) % placesIndexOriginal.length];
    }
  }

  /**
   * Compute the desired output of the distances,
   * in order from that found in constructing nearest neighbor.
   * Places is rearanged and returns the corresponding distances for the trip.
   * @param places is the place to be rearranged.
   * @param size is the number of elements in the array.
   * @return Returns an ArrayList of integers of ordered distances.
   */
  public ArrayList<Integer> nearestOutput(ArrayList<Place> places, int size) {
    ArrayList<Integer> out = new ArrayList<>();
    for (int index = 0; index < size; ++index) {
      out.add(memo[placesIndex[index]][placesIndex[(index+1) % size]]);
    }
    ArrayList<Place> newPlaces = new ArrayList<>();
    for (int index = 0; index < size; ++index) {
      newPlaces.add(places.get(placesIndex[index]));
    }
    places.clear();
    places.addAll(newPlaces);
    return out;
  }

  /**
   * Computes the grate circle distance between two coordinates.  The distance units
   * provided from the constructor determine the radius for the computation.
   *
   * @see Trip#legDistances(ArrayList) method used the distance to populate distances.
   * @see Trip#getDecimalDegrees()
   * @param latitude1 initial latitude in decimal degrees.
   * @param longitude1 initial longitude in decimal degrees.
   * @param latitude2 terminal latitude in decimal degrees.
   * @param longitude2 terminal longitude in decimal degrees.
   * @return Returns the rounded distance between two coordinate points in decimal degrees.
   */
  public int greatCirDist(double latitude1, double longitude1, double latitude2, double longitude2) {
    double deltaX, deltaY, deltaZ;
    double radius, chordLen, centralAngle;

    radius = getRadius(this.options.distance);

    double decLat1 = Math.toRadians(latitude1);
    double decLat2 = Math.toRadians(latitude2);
    double decLong1 = Math.toRadians(longitude1);
    double decLong2 = Math.toRadians(longitude2);

    deltaX = Math.cos(decLat2) * Math.cos(decLong2) -
            Math.cos(decLat1) * Math.cos(decLong1);
    deltaY = Math.cos(decLat2) * Math.sin(decLong2) -
            Math.cos(decLat1) * Math.sin(decLong1);
    deltaZ = Math.sin(decLat2) - Math.sin(decLat1);

    chordLen = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2) + Math.pow(deltaZ,2));
    centralAngle = 2 * Math.asin(chordLen / 2);

    return (int)Math.round(radius * centralAngle);
  }

  /**
    * Method that is called from legDistances in Trip,
    * this is the "0" level or no optimization algorithm.
    * @see Trip#legDistances(ArrayList) that calls this method
    * @param coordDegrees the coordinates of the places in the trip
    * @return Returns an array of leg distances in order with no optimization
    */
  public ArrayList<Integer> inOrder(ArrayList<Double> coordDegrees){

    ArrayList<Integer> dist = new ArrayList<Integer>();
    for (int i = 0; i < coordDegrees.size() - 2; i += 2) {
      dist.add(greatCirDist(coordDegrees.get(i), coordDegrees.get(i + 1),
              coordDegrees.get(i + 2), coordDegrees.get(i + 3)));
    }
    if (coordDegrees.size() > 1) {
      dist.add(greatCirDist(coordDegrees.get(coordDegrees.size() - 2),
              coordDegrees.get(coordDegrees.size() - 1), coordDegrees.get(0), coordDegrees.get(1)));
    }

  return dist;
  }

  /**
   * Method that is called from legDistances in Trip,this is the "1.0"
   * level or 2opt optimization algorithm. This method will construct the
   * nearest neighbor trip and then use TwoOptHelper and TwoOptReverse to perform
   * the 2opt algorithm for all places, using each one as the starting location.
   * Only the shortest trip is saved in the variable newTrip.
   * If a shorter trip is found, ArrayList places is assigned that order held by newTrip
   * @see Trip#legDistances(ArrayList, ArrayList) that calls this method
   * @param coordDegrees the coordinates of the places in the trip
   * @param places the original order to the places in the Trip
   * @return Returns an array of leg distances in 2opt optimized order
   */
  public ArrayList<Integer> twoOpt(ArrayList<Double> coordDegrees, ArrayList<Place> places){
    ArrayList<Integer> dist = new ArrayList<Integer>();
    return dist;
  }

  /**
   * Method interpreted from the lecture slides for 2opt, it will be used by the
   * method TwoOpt to check a given trip for any 2opt improvements.
   * @param places is the given Trip, keeps track of the order of indices to all places
   * @param bestDist distance of best trip, used to compare against 2opt changes
   * @param size the number of places in the trip
   * @return Returns the distance of the best trip 2opt could find or bestDist
   */
  public int twoOptHelper(int[] places, int bestDist, int size){
    boolean improvement = true;
    int thisDistance;

    while (improvement) {
      improvement = false;

      for(int i = 0; i <= size-3; i++) {
        for (int k = i+2; k <= size-1; k++) {
          int delta = -getDist(places, i,(i+1))-getDist(places, k,((k+1)%size))
                  +getDist(places, i , k) + getDist(places, (i+1), ((k+1)%size));
          if (delta < 0) {
            twoOptReverse(places, (i+1), k);
            improvement = true;
          }
        }
      }
    }
    thisDistance = getTourDist(places, size);

    if (thisDistance < bestDist) {
      return thisDistance;
    }
    else {
      return bestDist;
    }
  }

  /**
   * Method interpreted from the lecture slides for 2opt, it will be used by the
   * 2opt algorithm to reverse the path between 2 locations.
   * @param places keeps track of the order of indices to all places
   * @param start the index of one of the locations
   * @param end the index of the other locations
   */
  public void twoOptReverse(int[] places, int start, int end){
    int tmp;
    while (start < end) {
      tmp = places[start];
      places[start] = places[end];
      places[end] = tmp;
      start++;
      end--;
    }
  }

  /**
   * Method to copy over a trip in a specific order determined from places.
   * @param places keeps track of the ordered indices of places with respect to placesOrig
   * @param better the ArrayList to copy over to
   * @param orig the ArrayList indexed by places
   * @param size the number of places in the trip
   */
  public void setNewTrip(int[] places, ArrayList<Place> better, ArrayList<Place> orig, int size){
    for (int y = 0; y < size; y++) {
      better.add(orig.get(places[y]));
    }
  }

  /**
   * Method to return the leg distances in the same order as maintained by places.
   * Places is used to lookup distances between consecutive trip locations in memo.
   * @param places keeps track of the ordered indices of the trip
   * @param size the number of places in the trip
   * @return Returns the leg distances of the trip represented by places
   */
  public ArrayList<Integer> setLegs(int[] places, int size){
    ArrayList<Integer> dist = new ArrayList<Integer>();
    for (int y = 0; y < size; y++) {
      dist.add(memo[places[y]][places[(y+1) % size]]);
    }
    return dist;
  }

  /**
   * Method to return the distance from location start to location dest,
   * in a given trip represented by places.
   * @param places keeps track of the ordered indices of the trip
   * @param start index of the first location
   * @param dest index of the second location
   */
  public int getDist(int[] places, int start, int dest){
    return memo[places[i]][places[j]];
  }

  /**
   * Method to return the cummulative distance of a trip given by interpretting places.
   * Places contains indices used to lookup up distances in memo.
   * @param places keeps track of the ordered indices of the trip
   * @param size the number of locations in the trip
   * @return Returns the cummulative distance of a trip represented by places
   */
  public int getTourDist(int[] places, int size){
    int totalDistance = 0;
    for (int i = 0; i < size; ++i) {
      totalDistance += memo[places[i]][places[(i+1) % size]];
    }
    return totalDistance;
  }
}
