package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

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


}
