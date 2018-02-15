package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestGSVG {
  GatherSVG gsvg;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    gsvg = new GatherSVG();
  }

  @Test
  public void testReadSVG() {
    /*
      Unsure how to test Exceptions/Failed read.
      Method returns svg String.
     */
  }

  @Test
  public void testgetSVGLines() {
    assertEquals("", gsvg.getSVGLines());
  }
}
