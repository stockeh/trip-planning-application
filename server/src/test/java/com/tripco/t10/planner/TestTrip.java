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
  public void testLegDistancesSmall() {
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
    assertEquals(distancesKM2 ,trip2.legDistances(degrees2)); //test km
  }

  @Test
  public void testLegDistancesLarge() {
    Place foco = new Place("foco", "Fort Collins","40° 35' 6.9288\" N", "105° 5' 3.9084\" W");
    Place aspn = new Place("aspn", "Aspen","39.5149900", "-106.2705500");
    Place dnvr = new Place("dnvr", "Denver","39.7392° N","104.9903° W");
    Place cstlrck = new Place("cstlrck", "Castle Rock", "39.0149900", "-104.2705500");
    Place bldr = new Place("bldr", "Boulder", "40.0149900", "-105.2705500");

    Place zero = new Place("0", "Custer County", "38.10°N", "105.37°W");
    Place one = new Place("1", "San Juan County", "37.78°N", "107.67°W");
    Place two = new Place("2", "San Miguel County", "38.01°N", "108.43°W");
    Place three = new Place("3", "Crowley County", "38.32°N", "103.79°W");
    Place four = new Place("4", "Archuleta County", "37.20°N", "107.05°W");
    ArrayList<Place> p = new ArrayList<Place>(Arrays.asList(foco, aspn, dnvr, cstlrck, bldr, zero, one, two, three, four));


    Trip t = new Trip(p, "miles",1);
    ArrayList<Double> degrees = t.getDecimalDegrees();

    ArrayList<Integer> results = new ArrayList<Integer>();
    results.add(87); results.add(55); results.add(63); results.add(24); results.add(41); results.add(97);
    results.add(142); results.add(44); results.add(94); results.add(111);
    assertEquals(results, t.legDistances(degrees));
  }

}
