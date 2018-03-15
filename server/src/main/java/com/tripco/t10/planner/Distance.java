package com.tripco.t10.planner;

import java.util.ArrayList;
import java.lang.Math;

/**
 * The Distance class is responsible for calculating the distance between
 * two decimal coordinates.
 */
public class Distance {
  // Defining variables and constructors

  public String distance;
  public double optimization;

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers".
   *
   * @param distance the units in the trip.
   * @see Trip class for trip variables.
   */
  public Distance(String distance) {
    this.distance = distance.toLowerCase();
    this.optimization = 0;
  }

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers" and the level of optimization for the trip
   * Optimization level can be 0 1 2 3
   * @param distance the units in the trip.
   * @param optimization level for the trip
   * @see Trip class for trip variables.
   */
  public Distance(String distance, double optimization){
    this.distance = distance.toLowerCase();
    this.optimization = optimization;
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

    if (this.distance.equals("kilometers"))
      radius = 6371.0088;
    else radius = 3958.7613;

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
      dist.add(greatCirDist(coordDegrees.get(coordDegrees.size() - 2),
              coordDegrees.get(coordDegrees.size() - 1), coordDegrees.get(0), coordDegrees.get(1)));

  return dist;
  }
  /**
   * Method that is called from legDistances in Trip,
   * this is the "1" level or nearest neighbor algorithm.
   * @see Trip#legDistances(ArrayList) that calls this method
   * @param coordDegrees the coordinates of the places in the trip
   * @param placez the places of the trip, passed in to reorder for optimization
   * @return Returns an array of leg distances in optimized order
   */

  public ArrayList<Integer> nearestNeighbor(ArrayList<Double> coordDegrees,ArrayList<Place> placez){
    ArrayList<Integer> distances = new ArrayList<Integer>();
    ArrayList<Place> placezCopy = new ArrayList<Place>(placez);
    placez.clear();
    boolean[] visited = new boolean[coordDegrees.size()/2]; // keeps track of visited places
    int nearestNeighbor = 0;
    int source = 0; // used to keep track of current place
    int destination = 0; // used to keep track of nearest neighbor index
    int placesToGo = visited.length; // used to know when trip is done

    placez.add(placezCopy.get(0));
    visited[0] = true;
    placesToGo-=1;

    while (placesToGo > 0) {
      destination = findNN(coordDegrees, source, visited);
      nearestNeighbor = greatCirDist(coordDegrees.get(source), coordDegrees.get(source+1),
              coordDegrees.get(destination), coordDegrees.get(destination+1));
      placez.add(placezCopy.get(destination/2));
      visited[destination/2] = true;
      source = destination; // source becomes destination

      distances.add(nearestNeighbor);
      nearestNeighbor = Integer.MAX_VALUE;
      placesToGo -= 1;
    }

    distances.add(greatCirDist(coordDegrees.get(source), coordDegrees.get(source+1),
            coordDegrees.get(0), coordDegrees.get(1))); // return to last city
    return distances;
  }

  /**
   * Helper method used by the nearest neighbor algorithm, it iterates through
   * all the places and finds the index of the nearest unvisited place.
   * @see Distance#nearestNeighbor(ArrayList, ArrayList) that calls this method
   * @param degrees the latitude/longitude of all places
   * @param src the place used to calcultate distances to all other places to find nearest neighbor
   * @param visited the boolean array that keeps track of visited places
   * @return returns the index of the nearest neighbor
   */

  public int findNN(ArrayList<Double> degrees, int src, boolean[] visited){
    int tmp = 0;
    int dest = 0;
    Integer nn = Integer.MAX_VALUE;
    for (int j = 0; j < degrees.size(); j += 2) {
      if ((src != j) && (visited[j/2] == false)) {
      tmp = greatCirDist(degrees.get(src), degrees.get(src + 1),
                degrees.get(j), degrees.get(j + 1));
        if (nn > tmp) {
          nn = tmp;
          dest = j;
        }
      }
    }
    return dest;
  }

}
