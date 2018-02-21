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
  private double xAxis = 993, yAxis = 710,
                 mLongitude = -109, nLongitude = -102,
                 mLatitude = 41, nLatitude = 37;

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
      Scanner s = new Scanner(istr).useDelimiter("\\A");
      return s.hasNext() ? s.next() : ""; /* Convert istr to a String */
    } catch (Exception e) {
      e.printStackTrace();
      this.fileFound = false;
      return "<text x=\"300\" y=\"350\" font-family=\"Verdana\" font-size=\"35\" fill=\"red\">" +
              "ERROR! No File Found." +
              "</text>"; /* Files does not exist, should 'throw e', but this is nice (Open to change) */
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
    if (coordinate) // xAxis value for coordinate
      return ((input - this.mLongitude) * this.xAxis) / (this.nLongitude - this.mLongitude);
    else // yAxis value for coordinate
      return ((input - this.mLatitude) * this.yAxis) / (this.nLatitude - this.mLatitude);
  }

  /**
   * Returns a SVG group for the polypoints/polylines to be rendered on top
   * of the desired map.
   * @param arr is an array of decimal latitude and longitude values.
   * @return the SVG snippet for the lines between each point.
   */
  public String getSVGLines(ArrayList<Double> arr) {
    if (!fileFound) return "";

    String polyPoints = "";
    String first = "", second = "", startingLocation = "";
    for (int index = 0; index < arr.size(); index++) {
      if (index % 2 == 0) // Latitude Value
        second = Double.toString(computePoints(arr.get(index), false));
      else // Longitude Value
        first = Double.toString(computePoints(arr.get(index), true));

      if (!first.isEmpty() && !second.isEmpty()) {
        if (index == 1)
          startingLocation = " " + first + "," + second;
        polyPoints += " " + first + "," + second;
        first = ""; second = "";
      }
    }

    polyPoints += startingLocation;
    // System.out.println(polyPoints); // Check coordinate to pixel points next to each other.

    return "<g id=\"svg_1\">" +
            "<title>Boarder and Points</title>" +
            "<polygon points=\"0,0 993,0 993,710 0,710\" stroke-width=\"4\" stroke=\"brown\" fill=\"none\" id=\"svg_2\"/>" +
            "<polyline points= \"" + polyPoints + "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_3\"/>" +
           "</g>";
  }

}
