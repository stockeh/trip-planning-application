package com.tripco.t10.planner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Scanner;

public class GatherSVG {

  private boolean fileFound = true;
  private double xAxis = 993, yAxis = 710,
                 mLongitude = -109, nLongitude = -102,
                 mLatitude = 41, nLatitude = 37;

  public String readInSVG(String svg) {
    InputStream istr = getClass().getResourceAsStream(svg); /* Read in file from .jar into istr */
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

  public double computePoints(double input, boolean coordinate) {
    if (coordinate) // xAxis value for coordinate
      return ((input - this.mLongitude) * this.xAxis) / (this.nLongitude - this.mLongitude);
    else // yAxis value for coordinate
      return ((input - this.mLatitude) * this.yAxis) / (this.nLatitude - this.mLatitude);
  }

  public String getSVGLines(ArrayList<Double> arr) {
    if (!fileFound) return "";
    System.out.println("getSVGLines() ... ");

    String polyPoints = "";

    for (int index = 0; index < arr.size(); index++) {
      if (index % 2 == 0) // Latitude Value
        polyPoints += Double.toString(computePoints(arr.get(index), false)) + ",";

      else // Longitude Value
        polyPoints += Double.toString(computePoints(arr.get(index), true));
    }

    return "<g id=\"svg_1\">" +
            "<title>Boarder and Points</title>" +
            "<polygon points=\"0,0 993,0 993,710 0,710\" stroke-width=\"4\" stroke=\"brown\" fill=\"none\" id=\"svg_2\"/>" +
            "<polyline points=" + polyPoints + " fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_3\"/>" +
           "</g>";
  }

}
