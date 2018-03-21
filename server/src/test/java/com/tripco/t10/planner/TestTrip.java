package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.Assert.*;

/**
 * This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;
  Trip trip2;
  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
      Place denver = new Place("dnvr", "Denver","39.7392° N", "104.9903° W");
      Place boulder = new Place("bldr", "Boulder","40.0149900", "-105.2705500");
      Place fortcollins = new Place("foco", "Fort Collins","40° 35' 6.9288\" N","105° 5' 3.9084\" W");
      ArrayList<Place> places = new ArrayList<Place>(Arrays.asList(denver,boulder,fortcollins));
      trip = new Trip(places, "miles"); // no optimization value is defaulted to 0
      ArrayList<Place> places2 = new ArrayList<Place>(Arrays.asList(fortcollins,denver,boulder));
      trip2 = new Trip(places2, "miles", 0); // optimization value is set to 0
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testLegDistances() {
    ArrayList<Double> degrees = new ArrayList<>(Arrays.asList(39.7392, -104.9903, 40.0149900, -105.2705500, 40.585258, -105.084419));
    ArrayList<Double> degrees2 = new ArrayList<>(Arrays.asList(40.585258, -105.084419, 39.7392, -104.9903, 40.0149900, -105.2705500));
    ArrayList<Integer> distancesM = new ArrayList<Integer>(Arrays.asList(24, 41, 59));
    ArrayList<Integer> distancesM2 = new ArrayList<Integer>(Arrays.asList(59, 24, 41));
    assertEquals(distancesM ,trip.legDistances(degrees));  //test miles
    assertEquals(distancesM2 ,trip2.legDistances(degrees2));  //test miles
    trip2.setOptions("kilometers", 1); // nearest neighbor optimization
    trip.setOptions("kilometers", 0);
    ArrayList<Integer> distancesKM = new ArrayList<Integer>(Arrays.asList(39, 65, 94));
    ArrayList<Integer> distancesKM2 = new ArrayList<Integer>(Arrays.asList(65, 39, 94));
    assertEquals(distancesKM ,trip.legDistances(degrees)); //test km
//    assertEquals(distancesKM2 ,trip2.legDistances(degrees2)); //test km
  }

}
