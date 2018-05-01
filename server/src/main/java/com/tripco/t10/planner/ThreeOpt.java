package com.tripco.t10.planner;

import java.lang.Math;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

public class ThreeOpt {

    public int size;
    public int[][] memo;
    public int[] placesIndex;
    public ArrayList<Place> places;

    /**
     * Constructor that sets memo and placesIndex array from Distance.java class
     * to local variables. They are pass by value so no new memory is used.
     *
     * @param memo        is the memo table
     * @param placesIndex is the placesIndex

     * @param size        is the number of places in the trip
     * @param places      is the ArrayList of places from Distance.java
     * @see Distance class for more info on these variables.
     */
    public ThreeOpt(int[][] memo, int[] placesIndex, int size, ArrayList<Place> places) {
        this.memo = memo;
        this.placesIndex = placesIndex;
        this.size = size;
        this.places = places;
    }

    /**
     * Method that is called from Distance.java to compute
     * 3-opt optimization. The parameters used in this class are
     * passed through the constructor. This method rotates the places
     * and calculates 3opt for all places that can be the starting
     * location
     * @see Distance class for more info.
     */
    public ArrayList<Integer> threeOptimization(){
        ArrayList<Place> newTrip = new ArrayList<>();
        int[] placesNearN = placesIndex.clone();
        int bestDistance = Opt.getTourDist(placesIndex,size, this.memo);
        int newDistance;
        Opt.setNewTrip(placesIndex, newTrip, places, size);
        ArrayList<Integer> dist = Opt.setLegs(placesIndex,size, this.memo);

        for (int x = 1; x <= placesIndex.length; x++) {
            Distance.constructNearestNeighbor(placesNearN, size, this.memo);
            newDistance = threeOptHelper(placesNearN, bestDistance, size);
            if (newDistance < bestDistance){
                Opt.setNewTrip(placesNearN, newTrip, places, size);
                dist = Opt.setLegs(placesNearN, size, memo);
                bestDistance = newDistance;
            }
            Distance.rotateArray(placesNearN, placesIndex, x, size);
        }

        this.places.clear();
        this.places.addAll(newTrip);

        return dist;
    }

    /**
     * Method interpreted from the lecture slides for 3opt, it will be used by the
     * method ThreeOpt to check a given trip for all possible 3opt improvements.
     * @param places is the given Trip, keeps track of the order of indices to all places
     * @param bestDist distance of best trip, used to compare against past 3opt changes
     * @param size the number of places in the trip
     * @return Returns the distance of the best trip 2opt could find or bestDist
     */
    public int threeOptHelper(int[] places, int bestDist, int size) {
        boolean improvement = true;
        int thisDistance;

        while(improvement){
            improvement = false;
            for (int i=0; i < size-2; i++){
                for (int j=i+1; j < size-1; j++) {
                    for (int k = j+1; k < size; k++) {
                        thisDistance = getDist(places, i, i+1, j, j+1, k, k+1);
                        if (thisDistance > getDist(places, i, j+1, k, i+1, j, k+1)){ //1
                            thisDistance = getDist(places, i, j+1, k, i+1, j, k+1);
                            exchange1(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, j+1, k, j, i+1, k+1)){ //2
                            thisDistance = getDist(places, i, j+1, k, j, i+1, k+1);
                            exchange2(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, k, j+1, i+1, j, k+1)){ //3
                            thisDistance = getDist(places, i, k, j+1, i+1, j, k+1);
                            exchange3(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, j, i+1, k, j+1, k+1)){ //4
                            thisDistance = getDist(places, i, j, i+1, k, j+1, k+1);
                            exchange4(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, i+1, j, k, j+1, k+1)){ //5
                            thisDistance = getDist(places, i, i+1, j, k, j+1, k+1);
                            exchange5(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, j, i+1, j+1, k, k+1)){ //6
                            thisDistance = getDist(places, i, j, i+1, j+1, k, k+1);
                            exchange6(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist(places, i, k, j+1, j, i+1, k+1)){ //7
                            thisDistance = getDist(places, i, k, j+1, j, i+1, k+1);
                            exchange7(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                    }
                }
            }
        }

        thisDistance = Opt.getTourDist(places, size, memo);
        if (thisDistance < bestDist) {
            return thisDistance;
        }
        else {
            return bestDist;
        }
    }

    /**
     * Calculates the distances between p1-p2, p3-p4, p5-p6, and adds them.
     * There is one special case where k+1 == size, which will result in an
     * index out of bounds issue. TO HELP SOLVE THIS, k+1 SHOULD ALWAYS BE
     * WHERE p6 IS IN THE PARAMETER ORDER
     * @param places keeps track of the order of indices to all places
     * @param p1 the index of one location
     * @param p2 the index of one location
     * @param p3 the index of one location
     * @param p4 the index of one location
     * @param p5 the index of one location
     * @param p6 the index of one location, always k+1
     * @return returns distance for the order, p1-p2 + p3-p4 + p5-p6
     */
    public int getDist(int[] places, int p1, int p2, int p3, int p4, int p5, int p6){
        return   memo[places[p1]][places[p2]]
                +memo[places[p3]][places[p4]]
                +memo[places[p5]][places[(p6)%size]];
    }

    /**
     * A case for 3 opt, 3-opt 3X, performs the exchange determined by getDist1(...)
     * j+1 >> k, i+1 >> j
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange1(int[] places, int first, int sec, int third){
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = sec+1; y <= third; y++) {
            tmp[counter++] = places[y];
        }
        for (int x = first+1; x <= sec; x++){
            tmp[counter++] = places[x];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 3-opt 2X, performs the exchange
     * j+1 >> k, j << i+1
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange2(int[] places, int first, int sec, int third){
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = sec+1; y <= third; y++) {
            tmp[counter++] = places[y];
        }
        for (int x = sec; x >= first+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 3-opt 2X, performs the exchange
     * k << j+1, i+1 >> j
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange3(int[] places, int first, int sec, int third){
        // k << j+1, i+1 >> j
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = third; y >= sec+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int x = first+1; x <= sec; x++){
            tmp[counter++] = places[x];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 3-opt 2X, performs the exchange determined by getDist4(...)
     * j << i+1, k << j+1
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange4(int[] places, int first, int sec, int third){
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = sec; y >= first+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int x = third; x >= sec+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 2-opt 1X, performs the exchange determined by getDist6(...)
     * i+1 >> j, k << j+1
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange5(int[] places, int first, int sec, int third){
        // i+1 >> j, k << j+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= sec; z++){
            tmp[counter++] = places[z];
        }
        for (int x = third; x >= sec+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 2-opt 1X, performs the exchange determined by getDist6(...)
     * j << i+1, j+1 >> k
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange6(int[] places, int first, int sec, int third){
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = sec; y >= first+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int w = sec+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    /**
     * A case for 3 opt, 2-opt 1X, performs the exchange
     * k << j+1, j << i+1
     * @param places keeps track of the order of indices to all places
     * @param first the index of one of the considered locations
     * @param sec the index of one of the considered locations
     * @param third the index of the other considered locations
     */
    public void exchange7(int[] places, int first, int sec, int third){
        // k << j+1, j << i+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= first; z++){
            tmp[counter++] = places[z];
        }
        for (int y = third; y >= first+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int w = third+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }
}