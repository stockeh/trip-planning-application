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

    public ArrayList<Integer> threeOptimization(){
        ArrayList<Place> newTrip = new ArrayList<>();
        int[] placesNearN = placesIndex.clone();
        int bestDistance = Opt.getTourDist(placesIndex,size,memo);
        int newDistance;
        Opt.setNewTrip(placesIndex, newTrip, places, size);
        ArrayList<Integer> dist = Opt.setLegs(placesIndex,size,memo);
        //System.out.println(Arrays.toString(places));

        for (int x = 1; x <= placesIndex.length; x++) {
            //System.out.println("x: " + x);
            Distance.constructNearestNeighbor(placesNearN, size);
            newDistance = threeOptHelper(placesNearN, bestDistance, size);
            if (newDistance < bestDistance){
                //System.out.println("new Dist: " + newDistance);
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

    public int threeOptHelper(int[] places, int bestDist, int size) {
        boolean improvement = true;
        int thisDistance;

        while(improvement){
            improvement = false;
            for (int i=0; i < size-2; i++){
                for (int j=i+1; j < size-1; j++) {
                    for (int k = j+1; k < size; k++) {
                        thisDistance = getDist0(places, i, j, k);
                        if (thisDistance > getDist1(places, i, j, k)){
                            thisDistance = getDist1(places,i,j,k);
                            exchange1(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist3(places, i, j, k)){
                            thisDistance = getDist3(places,i,j,k);
                            exchange3(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist2(places, i, j, k)){
                            thisDistance = getDist2(places,i,j,k);
                            exchange2(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist4(places, i, j, k)){
                            thisDistance = getDist4(places,i,j,k);
                            exchange4(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist6(places, i, j, k)){
                            thisDistance = getDist6(places,i,j,k);
                            exchange6(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist7(places, i, j, k)){
                            thisDistance = getDist7(places,i,j,k);
                            exchange7(places, i , j , k);
                            improvement = true;
                            continue;
                        }
                        if (thisDistance > getDist6(places, i, j, k)){
                            thisDistance = getDist6(places,i,j,k);
                            exchange6(places, i , j , k);
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

    public int getDist0(int[] places, int i, int j, int k){
        return   memo[places[i]][places[i+1]]
                +memo[places[j]][places[j+1]]
                +memo[places[k]][places[(k+1)%size]];
    }

    public int getDist1(int[] places, int i, int j, int k){
        return   memo[places[i]][places[j+1]]
                +memo[places[k]][places[i+1]]
                +memo[places[j]][places[(k+1)%size]];
    }

    public int getDist2(int[] places, int i, int j, int k){
        return  memo[places[i]][places[k]]
                +memo[places[j+1]][places[i+1]]
                +memo[places[j]][places[(k+1)%size]];
    }

    public int getDist3(int[] places, int i, int j, int k){
        return   memo[places[i]][places[j+1]]
                +memo[places[(k+1)%size]][places[i+1]]
                +memo[places[j]][places[k]];
    }

    public int getDist4(int[] places, int i, int j, int k){
        return   memo[places[i]][places[j]]
                +memo[places[k]][places[i+1]]
                +memo[places[j+1]][places[(k+1)%size]];
    }

    public int getDist5(int[] places, int i, int j, int k){
        return   memo[places[i]][places[k]]
                +memo[places[j]][places[j+1]]
                +memo[places[i+1]][places[(k+1)%size]];
    }

    public int getDist6(int[] places, int i, int j, int k){
        return   memo[places[i]][places[i+1]]
                +memo[places[k]][places[j]]
                +memo[places[j+1]][places[(k+1)%size]];
    }

    public int getDist7(int[] places, int i, int j, int k){
        return   memo[places[i]][places[j]]
                +memo[places[j+1]][places[i+1]]
                +memo[places[k]][places[(k+1)%size]];
    }

    public void exchange1(int[] places, int i, int j, int k){
        // j+1 >> k, i+1 >> j
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = j+1; y <= k; y++) {
            tmp[counter++] = places[y];
        }
        for (int x = i+1; x <= j; x++){
            tmp[counter++] = places[x];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange2(int[] places, int i, int j, int k){
        // k << j+1, i+1 >> j
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = k; y >= j+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int x = i+1; x <= j; x++){
            tmp[counter++] = places[x];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange3(int[] places, int i, int j, int k){
        // j+1 >> k, j << i+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = j+1; y <= k; y++) {
            tmp[counter++] = places[y];
        }
        for (int x = j; x >= i+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange4(int[] places, int i, int j, int k){
        //j << i+1, k << j+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = j; y >= i+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int x = k; x >= j+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange5(int[] places, int i, int j, int k){
        // k << j+1, j << i+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = k; y >= i+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange6(int[] places, int i, int j, int k){
        // i+1 >> j, k << j+1
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= j; z++){
            tmp[counter++] = places[z];
        }
        for (int x = k; x >= j+1; x--){
            tmp[counter++] = places[x];
        }
        for (int w = k+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }

    public void exchange7(int[] places, int i, int j, int k){
        // j << i+1, j+1 >> k
        int[] tmp = new int[places.length];
        int counter = 0;
        for (int z = 0; z <= i; z++){
            tmp[counter++] = places[z];
        }
        for (int y = j; y >= i+1; y--) {
            tmp[counter++] = places[y];
        }
        for (int w = j+1; w < places.length; w++){
            tmp[counter++] = places[w];
        }
        for (int a = 0; a < places.length; a++){
            places[a] = tmp[a];
        }
    }
}