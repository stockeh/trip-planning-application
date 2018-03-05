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
  Distance distNearNeigh;
  Distance distKMNearNeigh;


  // Setup to be done before every test in TestDist
  @Before
  public void initialize() {
    distance = new Distance("miles");
    distanceKM = new Distance("kilometers");
    distNearNeigh = new Distance("miles", 1);
    distKMNearNeigh = new Distance("kilometers", 1);
  }

  @Test
  public void testUnits() {
    assertEquals("miles", distance.distance);
    assertEquals("kilometers", distanceKM.distance);
    assertEquals("miles", distNearNeigh.distance);
    assertEquals("kilometers", distKMNearNeigh.distance);
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
