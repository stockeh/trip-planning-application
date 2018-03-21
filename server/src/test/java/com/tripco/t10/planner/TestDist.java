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
  Distance distance;
  Distance distanceKM;
  Distance distanceUser;
  Option options1 = new Option("miles", "", "", 0);
  Option options2 = new Option("kilometers", "", "", 0);
  Option options3 = new Option("user defined", "inches", "123456", 0);  //RADIUS NOT ACTUAL SIZE!!!!!!!!!!!!!!!!!!

  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new Distance(options1);
    distanceKM = new Distance(options2);
    distanceUser = new Distance(options3);
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

  @Test
  public void testNearestNeighbor() {
    Place denver = new Place("dnvr", "Denver","39.7392° N", "104.9903° W");
    Place boulder = new Place("bldr", "Boulder","40.0149900", "-105.2705500");
    Place fortcollins = new Place("foco", "Fort Collins","40° 35' 6.9288\" N","105° 5' 3.9084\" W");
    Place aspen = new Place("aspn", "Aspen", "39.5149900", "-106.2705500");
    Place castlerock = new Place("cstlrck", "Castle Rock", "39.0149900", "-104.2705500");

    ArrayList<Place> places = new ArrayList<Place>(Arrays.asList(fortcollins, aspen, denver, castlerock, boulder));
    ArrayList<Double> degrees = new ArrayList<>(Arrays.asList(
            40.585258, -105.084419, // fortcollins
            39.5149900, -106.2705500, // aspen
            39.7392, -104.9903, // denver
            39.0149900, -104.2705500, // castlerock
            40.0149900, -105.2705500)); // boulder
    ArrayList<Integer> results = new ArrayList<Integer>(); // 24, 41, 59
    results.add(41); results.add(24); results.add(63); results.add(112); results.add(97);
    assertEquals(results, distance.nearestNeighbor(degrees, places));
  }

  @Test
  public void swap() {
    int[] arr = new int[]{0,1,2,3};
    int[] results = new int[]{0,2,1,3};
    distance.swap(arr, 1, 2);
    assertArrayEquals(results, arr);
  }

}
