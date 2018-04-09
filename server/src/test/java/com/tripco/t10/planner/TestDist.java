package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDist {
  Trip trip;
  Distance distance;
  Distance distanceKM;
  Distance distanceUser;
  Option options1 = new Option("miles", "", "", 0);
  Option options2 = new Option("kilometers", "", "", 0);
  Option options3 = new Option("user defined", "inches", "123456", 0);  //RADIUS NOT ACTUAL SIZE!!!!!!!!!!!!!!!!!!

  private ArrayList<Place> places;
  private ArrayList<Place> placesNew;
  private ArrayList<Double> degrees;

  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new Distance(options1);
    distanceKM = new Distance(options2);
    distanceUser = new Distance(options3);
    Place denver = new Place("dnvr", "Denver","39.7392° N", "104.9903° W");
    Place boulder = new Place("bldr", "Boulder","40.0149900", "-105.2705500");
    Place fortcollins = new Place("foco", "Fort Collins","40° 35' 6.9288\" N","105° 5' 3.9084\" W");
    Place aspen = new Place("aspn", "Aspen", "39.5149900", "-106.2705500");
    Place castlerock = new Place("cstlrck", "Castle Rock", "39.0149900", "-104.2705500");

    places = new ArrayList<Place>(Arrays.asList(fortcollins, aspen, denver, castlerock, boulder));
    degrees = new ArrayList<Double>(Arrays.asList(
            40.585258, -105.084419,     // fortcollins
            39.5149900, -106.2705500,   // aspen
            39.7392, -104.9903,         // denver
            39.0149900, -104.2705500,   // castlerock
            40.0149900, -105.2705500)); // boulder
  }

  @Test
  public void testUnits() {
    assertEquals("miles", options1.distance);
    assertEquals("kilometers", options2.distance);
    assertEquals("user defined", options3.distance);
  }

  @Test
  public void testDistancesFail() {
    assertEquals(0, distance.greatCirDist(0, 0,0, 0));  //not in colorado
    assertEquals(0, distanceUser.greatCirDist(0, 0,0, 0));  //not in colorado
    assertEquals(1382, distance.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
    assertEquals( 2224, distanceKM.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
  }

  @Test
  public void testDistancesPass() {
    assertEquals(24,distance.greatCirDist(39.7392, -104.9903, 40.0149900, -105.2705500));
    assertEquals(41, distance.greatCirDist(40.0149900, -105.2705500, 40.585258, -105.084419));
    assertEquals(59, distance.greatCirDist(40.585258, -105.084419, 39.7392, -104.9903));
    assertEquals(1266, distanceUser.greatCirDist(40.0149900, -105.2705500, 40.585258, -105.084419));
  }

  @Test
  public void testMemoizeDistance() {
    ArrayList<Double> degrees = new ArrayList<>(Arrays.asList(39.7392, -104.9903, 40.0149900, -105.2705500, 40.585258, -105.084419));
    int size = degrees.size()/2;
    int[][] results = new int[size][size];

    // A -> A,          A -> B,             A -> C
    results[0][0] = 0; results[0][1] = 24; results[0][2] = 59;
    // B -> A,          B -> B,             B - C
    results[1][0] = 24; results[1][1] = 0; results[1][2] = 41;
    // C -> A,          C -> B,             C -> C
    results[2][0] = 59; results[2][1] = 41; results[2][2] = 0;
    distance.memoizeDistance(degrees, size);
    assertArrayEquals(results, distance.memo);
  }

  /**
   * Formulating distances from degrees global.
   */
  @Test
  public void testNearestNeighborSmall() {
    ArrayList<Integer> results = new ArrayList<Integer>();
    results.add(41); results.add(24); results.add(63); results.add(112); results.add(97);
    assertEquals(results, distance.nearestNeighbor(degrees, places));
  }

  @Test
  public void testNearestNeighborLarge() {
    Place foco = new Place("foco", "Fort Collins","40° 35' 6.9288\" N", "105° 5' 3.9084\" W");
    Place aspn = new Place("aspn", "Aspen","39.5149900", "-106.2705500");
    Place dnvr = new Place("dnvr", "Denver","39.7392° N","104.9903° W");
    Place cstlrck = new Place("cstlrck", "Castle Rock", "39.0149900", "-104.2705500");
    Place bldr = new Place("bldr", "Boulder", "40.0149900", "-105.2705500");
    Place four = new Place("4", "Archuleta County", "37.20°N", "107.05°W");
    places = new ArrayList<Place>(Arrays.asList(foco, aspn, dnvr, cstlrck, bldr, four));

    trip = new Trip(places, "miles",0.5);
    ArrayList<Double> deg = trip.getDecimalDegrees();
    ArrayList<Integer> results = new ArrayList<Integer>();
    results.add(63); results.add(24); results.add(41); results.add(97); results.add(165); results.add(196);
    assertEquals(results, distance.nearestNeighbor(deg, trip.places));
  }

  @Test
  public void testSwap() {
    int[] arr = new int[]{0,1,2,3};
    int[] results = new int[]{0,2,1,3};
    distance.swap(arr, 1, 2);
    assertArrayEquals(results, arr);
  }

  @Test
  public void testRotateArray() {
    int[] arr = new int[]{0,1,2,3};
    int[] copied = new int[4];

    int[] results = new int[]{1,2,3,0};
    int start = 1, size = arr.length;
    distance.rotateArray(copied, arr, start, size);
    assertArrayEquals(results, copied);
  }

  /**
   * Same cumulative distances between these common destinations.
   * Specifically, in1, in3 and in4 share a common distance.
   */
  @Test
  public void testConstructNearestNeighbor() {
    int size = degrees.size()/2;
    distance.memoizeDistance(degrees, size);
    int[] in1 = new int[]{0,1,2,3,4};
    assertEquals(337, distance.constructNearestNeighbor(in1, size));


    int[] in2 = new int[]{1,2,3,4,0};
    assertEquals(375, distance.constructNearestNeighbor(in2, size));


    int[] in3 = new int[]{2,3,4,0,1};
    assertEquals(337, distance.constructNearestNeighbor(in3, size));


    int[] in4 = new int[]{3,4,0,1,2};
    assertEquals(337, distance.constructNearestNeighbor(in4, size));


    int[] in5 = new int[]{4,0,1,2,3};
    assertEquals(379, distance.constructNearestNeighbor(in5, size));
  }

  @Test
  public void testSetNewTrip(){
    int[] newOrder = {0,1,2,3,4};
    placesNew = new ArrayList<Place>();
    distance.setNewTrip(newOrder, placesNew, places, 5);
    assertEquals(places, placesNew);
  }

  @Test
  public void testSetLegs(){
    distance.memoizeDistance(degrees, 5);
    ArrayList<Integer> legs = new ArrayList<Integer>(Arrays.asList(97,70,63,87,41));
    int[] newOrder = {0,1,2,3,4};
    assertEquals(legs, distance.setLegs(newOrder, 5));
  }

  @Test
  public void testGetDistances(){
    // tests getTourDist and getDist
    int[] newOrder = {0,1,2,3,4};
    distance.memoizeDistance(degrees, 5);
    assertEquals(358, distance.getTourDist(newOrder, 5));
    assertEquals(97, distance.getDist(newOrder,0,1));
    assertEquals(70, distance.getDist(newOrder,1,2));
    assertEquals(63, distance.getDist(newOrder,2,3));
    assertEquals(87, distance.getDist(newOrder,3,4));
    assertEquals(41, distance.getDist(newOrder,4,0));
  }

}
