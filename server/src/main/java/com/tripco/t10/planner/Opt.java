package com.tripco.t10.planner;

import java.util.ArrayList;
import java.lang.Math;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.IntStream;

public class Opt {

    public int size;
    public int[][] memo;
    public int[] placesIndex;
    public ArrayList<Place> places;

    public Opt(int[][] m, int[] p, int size, ArrayList<Place> places){
    this.memo = m;
    this.placesIndex = p;
    this.size = size;
    this.places = places;
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
    public ArrayList<Integer> twoOptimization() {
        ArrayList<Place> newTrip = new ArrayList<>();
        int[] placesNN = placesIndex.clone();
        int best_distance = getTourDist(placesIndex,size);
        int new_distance;
        setNewTrip(placesIndex, newTrip, places, size);
        ArrayList<Integer> dist = setLegs(placesIndex,size);

        for (int x = 1; x <= placesIndex.length; x++){
            Distance.constructNearestNeighbor(placesNN, size);
            new_distance = twoOptHelper(placesNN, best_distance ,size);
            if (new_distance < best_distance){
                setNewTrip(placesNN, newTrip, places, size);
                dist = setLegs(placesNN, size);
                best_distance = new_distance;
            }
            Distance.rotateArray(placesNN, placesIndex, x, size);
        }

        this.places.clear();
        this.places.addAll(newTrip);

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
     * Method to return the distance from location start to location dest,
     * in a given trip represented by places.
     * @param places keeps track of the ordered indices of the trip
     * @param start index of the first location
     * @param dest index of the second location
     */
    public int getDist(int[] places, int start, int dest){
        return memo[places[start]][places[dest]];
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

    /**
     * Method to copy over a trip in a specific order determined from places.
     * @param places keeps track of the ordered indices of places with respect to placesOrig
     * @param better the ArrayList to copy over to
     * @param orig the ArrayList indexed by places
     * @param size the number of places in the trip
     */
    public void setNewTrip(int[] places, ArrayList<Place> better, ArrayList<Place> orig, int size){
        better.clear();
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
        ArrayList<Integer> dist = new ArrayList<>();
        for (int y = 0; y < size; y++) {
            dist.add(memo[places[y]][places[(y+1) % size]]);
        }
        return dist;
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

}