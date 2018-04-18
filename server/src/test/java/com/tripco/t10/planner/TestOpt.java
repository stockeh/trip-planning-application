package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;


/**
 * Testing for the Opt class.
 */
@RunWith(JUnit4.class)
public class TestOpt {
    Distance distance;
    Opt optTest;
    Option options1 = new Option("miles", "", "", 0, "svg");
    private ArrayList<Place> places;
    private ArrayList<Place> placesNew;
    private ArrayList<Double> degrees;

    @Before
    public void initialize() {
        distance = new Distance(options1);
        Place denver = new Place("dnvr", "Denver", "39.7392° N", "104.9903° W");
        Place boulder = new Place("bldr", "Boulder", "40.0149900", "-105.2705500");
        Place fortcollins = new Place("foco", "Fort Collins", "40° 35' 6.9288\" N", "105° 5' 3.9084\" W");
        Place aspen = new Place("aspn", "Aspen", "39.5149900", "-106.2705500");
        Place castlerock = new Place("cstlrck", "Castle Rock", "39.0149900", "-104.2705500");

        places = new ArrayList<Place>(Arrays.asList(fortcollins, aspen, denver, castlerock, boulder));
        degrees = new ArrayList<Double>(Arrays.asList(
                40.585258, -105.084419,     // fortcollins
                39.5149900, -106.2705500,   // aspen
                39.7392, -104.9903,         // denver
                39.0149900, -104.2705500,   // castlerock
                40.0149900, -105.2705500)); // boulder
        distance.memoizeDistance(degrees, 5);
    }

    @Test
    public void testSetNewTrip() {
        int[] newOrder = {0,1,2,3,4};
        placesNew = new ArrayList<Place>();
        optTest = new Opt(distance.memo, newOrder, 5, places);
        optTest.setNewTrip(newOrder, placesNew, places, 5);
        assertEquals(places, placesNew);
    }

    @Test
    public void testSetLegs(){
        int[] newOrder = {0,1,2,3,4};
        optTest = new Opt(distance.memo, newOrder, 5, places);
        ArrayList<Integer> legs = new ArrayList<Integer>(Arrays.asList(97,70,63,87,41));
        assertEquals(legs, optTest.setLegs(newOrder, 5));
    }

    @Test
    public void testGetDistances(){
        int[] newOrder = {0,1,2,3,4};
        // tests getTourDist and getDist
        optTest = new Opt(distance.memo, newOrder, 5, places);
        assertEquals(358, optTest.getTourDist(newOrder, 5));
        assertEquals(97, optTest.getDist(newOrder,0,1));
        assertEquals(70, optTest.getDist(newOrder,1,2));
        assertEquals(63, optTest.getDist(newOrder,2,3));
        assertEquals(87, optTest.getDist(newOrder,3,4));
        assertEquals(41, optTest.getDist(newOrder,4,0));
    }
}