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

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    distance = new CoordinateDistance();
  }


  @Test
  public void testDistances() {
    // Call the equals() method of the first object on the second object.
    assertEquals(3959, distance.greatCirDist("", "","", ""));
  }
}
