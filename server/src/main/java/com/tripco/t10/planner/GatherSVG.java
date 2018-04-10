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
//    System.out.println("SVG - update coordinate boundaries");
    this.leftLongitude = leftLongitude;
    this.rightLongitude = rightLongitude;
    this.topLatitude = topLatitude;
    this.bottomLatitude = bottomLatitude;
    System.out.print("");
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
   * @see GatherSVG#getsvgLines(ArrayList) takes this value to
   * insert to a pair of points
   * @param input is the decimal coordinate to be interpolated
   * @param coordinate determines if the value is latitude or longitude
   * @return the decimal value of the coordinate as a pixel component
   */
  public double computePoints(double input, boolean coordinate) {
    if (coordinate) { // longitude
      return ((input - this.leftLongitude) * this.xxAxis)
              / (this.rightLongitude - this.leftLongitude);
    }
    else { // latitude
      return ((input - this.topLatitude) * this.yyAxis)
              / (this.bottomLatitude - this.topLatitude);
    }
  }

  /**
   * Check if the the coordinates can be spanned around the map
   * rather than across.
   * @param coordinates is an array list of decimal latitude and longitude values.
   * @param index of the start to some coordinate pair
   * @return true if the coordinates can be spanned, false otherwise or if out of bounds.
   */
  public boolean checkWrapping(ArrayList<Double> coordinates, int index) {
    if (index > coordinates.size() - 4) {
      return false;
    }
    double startLongitude = coordinates.get(index + 1);
    double endLongitude = coordinates.get(index + 3);

    if (endLongitude > 0) {
      return (endLongitude - startLongitude >= 180);
    }
    else {
      return (startLongitude - endLongitude >= 180);
    }
  }

  /**
   * Calculations for mapping the polypoints to the respective pixels.
   * Splits the coordinate lines up with polypoint.
   * @param coordinates is an array list of decimal latitude and longitude values.
   * @param points is an array holding strings for the coordinate pairs.
   * @param index of the start to some coordinate pair
   */
  public void wrapPolypoints(ArrayList<Double> coordinates, String[] points, int index) {
    double startLatitude = coordinates.get(index);
    double startLongitude = coordinates.get(index + 1);
    points[0] = " " + Double.toString(computePoints(startLongitude, true));
    points[1] = "," + Double.toString(computePoints(startLatitude, false));

    double endLongitude = coordinates.get(index + 3);
    double borderDistance = 180.0 - Math.abs(startLongitude) + 180.0 - Math.abs(endLongitude);
    double interiumOne = borderDistance + startLongitude;
    double interiumTwo = endLongitude - borderDistance;
    double endLatitude = coordinates.get(index + 2);
    if (startLongitude < 0) {
      interiumOne = startLongitude - borderDistance;
      interiumTwo = endLongitude + borderDistance;
    }
    points[2] = " " + Double.toString(computePoints(interiumOne, true));
    points[3] = "," + Double.toString(computePoints(endLatitude, false));
    points[4] = "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\"/><polyline points= \"";
    points[5] = " " + Double.toString(computePoints(interiumTwo, true));
    points[6] = "," + Double.toString(computePoints(startLatitude, false));
  }

  /**
   * Returns a SVG group for the polypoints/polylines to be rendered on top
   * of the desired map.
   * @param coordinates is an array list of decimal latitude and longitude values.
   * @return the SVG snippet for the lines between each point.
   */
  public String getsvgLines(ArrayList<Double> coordinates) {
    if (!fileFound) return "";

    String polyPoints = "", startingLocation = "";
    String[] points = new String[7];
    for (int index = 0; index < coordinates.size()-1; index += 2) {
      if (this.checkWrapping(coordinates, index)) {
        this.wrapPolypoints(coordinates, points, index);
      }
      else {
        points[0] = " " + Double.toString(computePoints(coordinates.get(index + 1), true)); //first
        points[1] = "," + Double.toString(computePoints(coordinates.get(index), false)); //second
        for (int i = 2; i < 7; i++) {
          points[i] = "";
        }
      }
      if (index == 0)
        startingLocation = String.join("", points);
      polyPoints += String.join("", points);
    }
    polyPoints += startingLocation;

    return "<g id=\"svg_1\"><title>Boarder and Points</title><polyline points= \""
            + polyPoints + "\" fill=\"none\" stroke-width=\"2\" stroke=\"blue\" id=\"svg_2\"/></g>";
  }

}
