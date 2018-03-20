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

  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new Distance("miles", 0);
    distanceKM = new Distance("kilometers", 0);
  }

  @Test
  public void testUnits() {
    assertEquals("miles", distance.distance);
    assertEquals("kilometers", distanceKM.distance);
  }

  @Test
  public void testDistancesFail() {
    assertEquals(0, distance.greatCirDist(0, 0,0, 0));  //not in colorado
    assertEquals(1382, distance.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
    assertEquals( 2224, distanceKM.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
  }

  @Test
  public void testDistancesPass() {
    assertEquals(24,distance.greatCirDist(39.7392, -104.9903, 40.0149900, -105.2705500));
    assertEquals(41, distance.greatCirDist(40.0149900, -105.2705500, 40.585258, -105.084419));
    assertEquals(59, distance.greatCirDist(40.585258, -105.084419, 39.7392, -104.9903));
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
    distance.memoizeDistance(degrees);
    assertArrayEquals(results, distance.memo);
  }

  @Test
  public void testNearestNeighbor() {
    Place denver = new Place("dnvr", "Denver","39.7392° N", "104.9903° W");
    Place boulder = new Place("bldr", "Boulder","40.0149900", "-105.2705500");
    Place fortcollins = new Place("foco", "Fort Collins","40° 35' 6.9288\" N","105° 5' 3.9084\" W");
    ArrayList<Place> places = new ArrayList<Place>(Arrays.asList(denver,boulder,fortcollins));
    ArrayList<Double> degrees = new ArrayList<>(Arrays.asList(39.7392, -104.9903, 40.0149900, -105.2705500, 40.585258, -105.084419));
    ArrayList<Integer> results = new ArrayList<Integer>();
    results.add(0); results.add(0); results.add(0);
    assertEquals(results, distance.nearestNeighbor(degrees, places));
  }

}
