package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * This class contains tests for the GatherSVG class.
 */
@RunWith(JUnit4.class)
public class TestGSVG {
  GatherSVG gsvg;
  String svgFirstHalf = "<g id=\"svg_1\"><title>Boarder and Points</title>" +
          "<polygon points=\"0,0 993,0 993,710 0,710\" stroke-width=\"4\" stroke=\"brown\" fill=\"none\" id=\"svg_2\"/>" +
          "<polyline points= \"";
  String svgSecondHalf = "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_3\"/></g>";
  String polyPoints;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    gsvg = new GatherSVG();
  }

  @Test
  public void testGetSVGLines() {
    ArrayList<Double> arr = new ArrayList<Double>(4);
    arr.add(41.0);
    arr.add(-109.0);
    arr.add(37.0);
    arr.add(-102.0);

    this.polyPoints = " 0.0,-0.0 993.0,710.0 0.0,-0.0";
    assertEquals( svgFirstHalf + polyPoints + svgSecondHalf , gsvg.getSVGLines(arr));
  }

  @Test
  public void testComputePoints() {
    assertEquals(63.651583714285, gsvg.computePoints(-108.551298,true), .00001);
    assertEquals(344.4298, gsvg.computePoints(39.05955,false), .0001);

    assertEquals(15462.428571429, gsvg.computePoints(0, true), .0001);
    assertEquals(0, gsvg.computePoints(-109, true), .0001);
    assertEquals(0, gsvg.computePoints(41, false), .0001);
  }
}
