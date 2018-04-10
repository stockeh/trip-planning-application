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
  GatherSVG coloradoSvg;
  GatherSVG wolrdSvg;
  String svgFirstHalf = "<g id=\"svg_1\"><title>Boarder and Points</title>" +
          "<polyline points= \"";
  String svgSecondHalf = "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_2\"/></g>";
  String polyPoints;
  ArrayList<Double> arr = new ArrayList<Double>(6);
  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    arr.add(45.0);
    arr.add(-45.0);

    arr.add(0.0);
    arr.add(-135.0);

    arr.add(0.0);
    arr.add(135.0);

    coloradoSvg = new GatherSVG();
    wolrdSvg = new GatherSVG();
  }

  @Test
  public void testCheckWrapping() {
    ArrayList<Double> wrapper = new ArrayList<>(arr);
    assertEquals(false, wolrdSvg.checkWrapping(wrapper, 0));
    assertEquals(true, wolrdSvg.checkWrapping(wrapper, 2));
    assertEquals(false, wolrdSvg.checkWrapping(wrapper, 4));
    // Out of Bounds
    assertEquals(false, wolrdSvg.checkWrapping(wrapper, 6));
    assertEquals(false, wolrdSvg.checkWrapping(wrapper, 7));
  }

  @Test
  public void testGetSVGLines() {
    this.polyPoints = " 384.0,128.0 128.0,256.0 -128.0,256.0\" fill=\"none\" stroke-width=\"2\" "
        + "stroke=\"blue\"/><polyline points= \" 1152.0,256.0 896.0,256.0 384.0,128.0";

    wolrdSvg.setAxis(1024, 512);
    wolrdSvg.setBounds(-180,180,90,-90);
    wolrdSvg.getsvgLines(arr);
    assertEquals( svgFirstHalf + polyPoints + svgSecondHalf , wolrdSvg.getsvgLines(arr));
  }

  @Test
  public void testComputePoints() {
    assertEquals(63.651583714285, coloradoSvg.computePoints(-108.551298,true), .00001);
    assertEquals(344.4298, coloradoSvg.computePoints(39.05955,false), .0001);

    assertEquals(15462.428571429, coloradoSvg.computePoints(0, true), .0001);
    assertEquals(0, coloradoSvg.computePoints(-109, true), .0001);
    assertEquals(0, coloradoSvg.computePoints(41, false), .0001);
  }
}
