package com.tripco.t10.planner;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.Assert.assertArrayEquals;
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
    assertEquals(Math.PI / 6, distance.convertToRadian(30.0), .00000001);
    assertEquals(Math.PI / 3, distance.convertToRadian(60.0), .00000001);
    assertEquals(Math.PI / 2, distance.convertToRadian(90.0), .00000001);

    assertEquals(-3 * Math.PI / 6, distance.convertToRadian(-90.0), .00000001);
    assertEquals(0, distance.convertToRadian(0.0), .00000001);
  }

  @Test
  public void testUnits() {
    assertEquals("miles", distance.distance);
    assertEquals("kilometers", distanceKM.distance);
  }

  @Test
  public void testDistances() {
    assertEquals(-1, distance.greatCirDist("", "","", ""));  //not in colorado
    assertEquals(-1, distance.greatCirDist("40.445", "-79.982","20.445", "-79.982"));  //not in colorado
    assertEquals(-1, distanceKM.greatCirDist("40.445", "-79.982","20.445", "-79.982"));  //not in colorado
  }

  @Test
  public void testHasDirection() {
    assertEquals('N',distance.hasDirection("88.2°20.34'38.1\"N"));
    assertEquals('E',distance.hasDirection("88.2°20.34'38.1\"E"));
    assertEquals('0',distance.hasDirection("88.2°20.34'38.1"));
  }

  @Test
  public void testGetLocationArray(){
    assertArrayEquals(new double[]{88.2,20.34,38.1},distance.getLocationArray("88.2°20.34'38.1\""),.00000001);
    assertArrayEquals(new double[]{0,0,0},distance.getLocationArray(""),.00000001);
    assertArrayEquals(new double[]{0,3.2,0},distance.getLocationArray("3.2'"),.00000001);
  }


  @Test
  public void testParseLat() {
    assertEquals(38.2 + (20.34 / 60) + (38.1 / 3600.0), distance.parseLatLong("38.2°20.34'38.1\"N", true),.00000001);  //test no spaces
    assertEquals(39.35 + (32.0 / 60) + (42.12 / 3600.0), distance.parseLatLong("    39.35  ° 32   ' 42.12   \" N  ", true),.00000001);  //test latitude general form and lots of spaces
    assertEquals(40.35 - (32.0 / 60.0) - (42.12 / 3600.0), distance.parseLatLong("-40.35° 32' 42.12\" S", true),.00000001); //test negative sign
    assertEquals(37.0 + (42.12 / 3600.0), distance.parseLatLong("37° 42.12\" N", true),.00000001);  //test exclude degrees from expression
    assertEquals(37.21, distance.parseLatLong("-37.21 S", true),.00000001);  //test decimal degrees plus direction
  }

  @Test
  public void testParseLong() {
    assertEquals(-108.2+(20.64/60.0)+(38.1/3600.0), distance.parseLatLong("-108.2° 20.64' 38.1\" E",false),.00000001); //test longitude general form
    assertEquals(-102.2-(20.0/60.0)-(100.12/3600.0), distance.parseLatLong("102.2° 20' 100.12\" W",false),.00000001);  //test west and carryover from seconds
    assertEquals(-107.32, distance.parseLatLong("   -107.32   ",false),.00000001);  //test already in format longitude degrees and extra spaces
    assertEquals(-104.95, distance.parseLatLong("104.95° W",false),.00000001);  //test only degrees
    assertEquals(-105.95 + (32.1/60.0), distance.parseLatLong("-105.95° 32.1'",false),.00000001);  //test no direction in full format
  }

  @Test
  public void testParseLatLongFail() {
    assertEquals(-1000, distance.parseLatLong("40.95°60' 43\" N",true),.00000001);  //test that latitude cant go over 90
    assertEquals(-1000, distance.parseLatLong("109.95°60' 43\" E",false),.00000001);  //test that longitude cant go over 180;
    assertEquals(-1000, distance.parseLatLong("49.95°60' 43\" E",true),.00000001);  //test that latitude cant be E or W
    assertEquals(-1000, distance.parseLatLong("59.95°60' 43\" S",false),.00000001);  //test that longitude cant be north south
    assertEquals(-1000, distance.parseLatLong("        ",true),.00000001);
    assertEquals(-1000,distance.parseLatLong("20' 43 39.95° N", true),.00000001); //test out of order
  }
}
