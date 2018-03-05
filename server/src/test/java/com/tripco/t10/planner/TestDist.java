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
  Distance distOPT;
  Distance distKMOPT;


  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new Distance("miles"); // without optimization should default to 0
    distanceKM = new Distance("kilometers");
    distOPT = new Distance("miles", 0); // with optimization level of 0
    distKMOPT = new Distance("kilometers", 0);
  }

  @Test
  public void testUnits() {
    assertEquals("miles", distance.distance);
    assertEquals("kilometers", distanceKM.distance);
    assertEquals("miles", distOPT.distance);
    assertEquals("kilometers", distKMOPT.distance);
  }

  @Test
  public void testDistancesFail() {
    assertEquals(0, distance.greatCirDist(0, 0,0, 0));  //not in colorado
    assertEquals(1382, distance.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
    assertEquals( 2224, distanceKM.greatCirDist(40.445, -79.982,20.445, -79.982));  //not in colorado
    assertEquals(1382, distOPT.greatCirDist(40.445, -79.982,20.445, -79.982));
    assertEquals( 2224, distKMOPT.greatCirDist(40.445, -79.982,20.445, -79.982));
  }

  @Test
  public void testDistancesPass() {
    assertEquals(24,distance.greatCirDist(39.7392, -104.9903, 40.0149900, -105.2705500));
    assertEquals(41, distance.greatCirDist(40.0149900, -105.2705500, 40.585258, -105.084419));
    assertEquals(59, distance.greatCirDist(40.585258, -105.084419, 39.7392, -104.9903));
  }


}
