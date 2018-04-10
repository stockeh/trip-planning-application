package com.tripco.t10.planner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * The Gather SVG class is responsible for calculating the SVG points/lines given
 * the decimale coordinates from places.  As well as reading in a SVG map to
 * be drawn on.
 */
public class GatherSVG {

  private boolean fileFound = true;
  private double xxAxis = 993;
  private double yyAxis = 710;
  private int leftLongitude = -109;
  private int rightLongitude = -102;
  private int topLatitude = 41;
  private int bottomLatitude = 37;

  /**
   * Setter for the regional axis for the svg map.
   * @param xxAxis pixel width of svg.
   * @param yyAxis pixel height of svg.
   */
  public void setAxis(double xxAxis, double yyAxis) {
    this.xxAxis = xxAxis;
    this.yyAxis = yyAxis;
  }

  /**
   * Setter for the coordinate bounds of the svg map.
   * @param leftLongitude furthers left coordinate.
   * @param rightLongitude furthers right coordinate.
   * @param topLatitude top coordinate.
   * @param bottomLatitude bottom coordinate.
   */
  public void setBounds(int leftLongitude, int rightLongitude,
                        int topLatitude, int bottomLatitude) {
    System.out.println("SVG - update coordinate boundaries");
    this.leftLongitude = leftLongitude;
    this.rightLongitude = rightLongitude;
    this.topLatitude = topLatitude;
    this.bottomLatitude = bottomLatitude;
  }

  /**
   * Returns in the SVG from the .jar file as a String.
   * This is later injected to a string for the map.
   * @see Trip#svg(ArrayList) Method to return too.
   * @param svg Name of the file to be found in .jar file.
   * @return A string of the .svg if file exists, or Error otherwise.
   */
  public String readInSVG(String svg) {
    InputStream istr = getClass().getResourceAsStream(svg);
    try {
      BufferedReader reader = new BufferedReader(new InputStreamReader(istr));
      Scanner scan = new Scanner(istr).useDelimiter("\\A");
      return scan.hasNext() ? scan.next() : ""; /* Convert istr to a String */
    } catch (Exception e) {
      e.printStackTrace();
      this.fileFound = false;
      return "<text x=\"300\" y=\"350\" font-family=\"Verdana\" font-size=\"35\" fill=\"red\">"
             + "ERROR! No File Found."
             + "</text>"; /* Files does not exist, should 'throw e',
                            but this is nice (Open to change) */
    }
  }

  /**
   * Returns a scaled value of the decimal coordinate to SVG.
   * This algorithm uses the interpolation equation to compute.
   * @see GatherSVG#getSVGLines(ArrayList) takes this value to
   * insert to a pair of points
   * @param input is the decimal coordinate to be interpolated
   * @param coordinate determines if the value is latitude or longitude
   * @return the decimal value of the coordinate as a pixel component
   */
  public double computePoints(double input, boolean coordinate) {
    if (coordinate) { // xxAxis value for coordinate
      return ((input - this.leftLongitude) * this.xxAxis)
              / (this.rightLongitude - this.leftLongitude);
    }
    else { // yyAxis value for coordinate
      return ((input - this.topLatitude) * this.yyAxis)
              / (this.bottomLatitude - this.topLatitude);
    }
  }

  public boolean checkWrapping(ArrayList<Double> arr, int index) {
    return true;
  }

  /**
   * Returns a SVG group for the polypoints/polylines to be rendered on top
   * of the desired map.
   * @param arr is an array of decimal latitude and longitude values.
   * @return the SVG snippet for the lines between each point.
   */
  public String getSVGLines(ArrayList<Double> arr) {
    if (!fileFound) return "";

    String first, second;
    String polyPoints = "", startingLocation = "";
    for (int index = 0; index < arr.size()-1; index += 2) {
        boolean wrap = this.checkWrapping(arr, index);
        second = Double.toString(computePoints(arr.get(index), false));
        first = Double.toString(computePoints(arr.get(index+1), true));
        if (index == 0)
          startingLocation = " " + first + "," + second;
        polyPoints += " " + first + "," + second;
    }

    polyPoints += startingLocation;
    // System.out.println(polyPoints); // Check coordinate to pixel points next to each other.

    return "<g id=\"svg_1\"><title>Boarder and Points</title><polyline points= \""
            + polyPoints
            + "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_2\"/></g>";
  }

}
