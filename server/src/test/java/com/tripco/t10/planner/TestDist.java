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


}
