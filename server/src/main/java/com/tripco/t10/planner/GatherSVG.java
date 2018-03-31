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
  private double x_axis = 993, y_axis = 710;
  private int m_longitude = -109, n_longitude = -102,
              m_latitude = 41, n_latitude = 37;

  /**
   * Setter for the regional axis for the svg map.
   * @param x_axis pixel width of svg.
   * @param y_axis pixel height of svg.
   */
  public void setAxis(double x_axis, double y_axis) {
    this.x_axis = x_axis;
    this.y_axis = y_axis;
  }

  /**
   * Setter for the coordinate bounds of the svg map.
   * @param m_longitude furthers left coordinate.
   * @param n_longitude furthers right coordinate.
   * @param m_latitude top coordinate.
   * @param n_latitude bottom coordinate.
   */
  public void setBounds(int m_longitude, int n_longitude, int m_latitude, int n_latitude) {
    this.m_longitude = m_longitude;
    this.n_longitude = n_longitude;
    this.m_latitude = m_latitude;
    this.n_latitude = n_latitude;
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
    if (coordinate) // x_axis value for coordinate
      return ((input - this.m_longitude) * this.x_axis) / (this.n_longitude - this.m_longitude);
    else // y_axis value for coordinate
      return ((input - this.m_latitude) * this.y_axis) / (this.n_latitude - this.m_latitude);
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
