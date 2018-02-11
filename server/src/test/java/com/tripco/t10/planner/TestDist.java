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
}
