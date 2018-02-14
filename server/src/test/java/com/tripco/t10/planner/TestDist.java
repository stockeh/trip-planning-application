package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/*
  This class contains tests for the CoordinateDistance class.
 */
@RunWith(JUnit4.class)
public class TestDist {
  CoordinateDistance distance;
  CoordinateDistance distanceKM;

  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new CoordinateDistance();
    distanceKM = new CoordinateDistance("kilometers");
  }

  @Test
  public void testConversion() {
    assertEquals(Math.PI / 6, distance.convertToRadian("30"), .00000001);
    assertEquals(Math.PI / 3, distance.convertToRadian("60"), .00000001);
    assertEquals(Math.PI / 2, distance.convertToRadian("90"), .00000001);

    assertEquals(-3 * Math.PI / 6, distance.convertToRadian("-90"), .00000001);
    assertEquals(0, distance.convertToRadian("0"), .00000001);
  }

  @Test
  public void testUnits() {
    assertEquals("miles", distance.distance);
    assertEquals("kilometers", distanceKM.distance);
  }

  @Test
  public void testDistances() {
    assertEquals(0, distance.greatCirDist("", "","", ""));
    assertEquals(1382, distance.greatCirDist("40.445", "-79.982","20.445", "-79.982"));
    assertEquals(2224, distanceKM.greatCirDist("40.445", "-79.982","20.445", "-79.982"));
  }

  @Test
  public void testParseLat() {
    assertEquals(88.2 + (20.34 / 60) + (38.1 / 3600), distance.parseLatLong("88.2°20.34'38.1\"N", true),.00000001);  //test no spaces
    assertEquals(43.35 + (32 / 60) + (42.12 / 3600), distance.parseLatLong("43.35° 32' 42.12\" N", true),.00000001);  //test latitude general form
    assertEquals(-43.35 - (32 / 60) - (42.12 / 3600), distance.parseLatLong("43.35° 32' 42.12\" S", true),.00000001); //test negative sign
    assertEquals(88.2 + (38.1 / 3600), distance.parseLatLong("88.2° 38.1\"", true),.00000001);  //test that direction isnt required
  }

  @Test
  public void testParseLong() {
    assertEquals(148.2+(20.64/60)+(38.1/3600), distance.parseLatLong("148.2° 20.64' 38.1\" E",false),.00000001); //test longitude general form
    assertEquals(-88.2-(20.34/60)-(100.12/3600), distance.parseLatLong("31.2° 20' 100.12\" W",false),.00000001);  //test west and carryover from seconds
    assertEquals(179.32, distance.parseLatLong("   179.32   ",false),.00000001);  //test already in format longitude degrees and extra spaces
    assertEquals(-143.95, distance.parseLatLong("143.95° W",false),.00000001);  //test only degrees
    assertEquals(143.95 + (32.1/60), distance.parseLatLong("143.95° 32.1'",false),.00000001);  //test no direction in full format

  }

  @Test
  public void testParseLatLongFail() {
    assertEquals(-1000, distance.parseLatLong("89.95°60' 43\" N",true));  //test that latitude cant go over 90
    assertEquals(-1000, distance.parseLatLong("179.95°60' 43\" E",false));  //test that longitude cant go over 180;
    assertEquals(-1000, distance.parseLatLong("49.95°60' 43\" E",true));  //test that latitude cant be E or W
    assertEquals(-1000, distance.parseLatLong("59.95°60' 43\" S",false));  //test that longitude cant be north south

  }
}
