package com.tripco.t10.planner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

public class GatherSVG {

  private boolean fileFound = true;

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

  public String computePoints() {
    return "";
  }

  public String getSVGLines() {
    if (!fileFound) return "";
    System.out.println("getSVGLines() ... ");
    return "<g id=\"svg_1\">" +
            "<title>Boarder and Points</title>" +
            "<polygon points=\"0,0 993,0 993,710 0,710\" stroke-width=\"4\" stroke=\"brown\" fill=\"none\" id=\"svg_2\"/>" +
            "<polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_3\"/>" +
           "</g>";
  }

}
