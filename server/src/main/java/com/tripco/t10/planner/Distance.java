package com.tripco.t10.planner;

import java.util.ArrayList;
import java.lang.Integer;
import java.lang.Math;

/**
 * The Distance class is responsible for calculating the distance between
 * two decimal coordinates.
 */
public class Distance {
  // Defining variables and constructors

  public String distance;
  public int optimization;

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers".
   *
   * @param distance the units in the trip.
   * @see Trip class for trip variables.
   */
  public Distance(String distance){
    this.distance = distance.toLowerCase();
    this.optimization = 0;
  }

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers".
   *
   * @param distance the units in the trip.
   * @param optimization the level of optimization applied to this trip, 0 1 2 3
   * @see Trip class for trip variables.
   */
  public Distance(String distance, int optimization) {
    this.distance = distance.toLowerCase();
    this.optimization = optimization;
  }

  /**
   * Computes the grate circle distance between two coordinates.  The distance units
   * provided from the constructor determine the radius for the computation.
   *
   * @param latitude1  initial latitude in decimal degrees.
   * @param longitude1 initial longitude in decimal degrees.
   * @param latitude2  terminal latitude in decimal degrees.
   * @param longitude2 terminal longitude in decimal degrees.
   * @return Returns the rounded distance between two coordinate points in decimal degrees.
   * @see Trip#legDistances(ArrayList) method used the distance to populate distances.
   * @see Trip#getDecimalDegrees()
   */
  public int greatCirDist(double latitude1, double longitude1, double latitude2, double longitude2) {
    double deltaX, deltaY, deltaZ;
    double radius, chordLen, centralAngle;

    if (this.distance.equals("kilometers"))
      radius = 6371.0088;
    else radius = 3958.7613;

    double decLat1 = Math.toRadians(latitude1);
    double decLat2 = Math.toRadians(latitude2);
    double decLong1 = Math.toRadians(longitude1);
    double decLong2 = Math.toRadians(longitude2);

    deltaX = Math.cos(decLat2) * Math.cos(decLong2) -
            Math.cos(decLat1) * Math.cos(decLong1);
    deltaY = Math.cos(decLat2) * Math.sin(decLong2) -
            Math.cos(decLat1) * Math.sin(decLong1);
    deltaZ = Math.sin(decLat2) - Math.sin(decLat1);

    chordLen = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
    centralAngle = 2 * Math.asin(chordLen / 2);

    return (int) Math.round(radius * centralAngle);
  }

  public ArrayList<Integer> inOrder(ArrayList<Double> coordDegrees){
    //if (coordDegrees.size() > 0)

    ArrayList<Integer> dist = new ArrayList<Integer>();
      for (int i = 0; i < coordDegrees.size() - 2; i += 2) /* Append all dest1 < - > dest2 to dist */
        dist.add(greatCirDist(coordDegrees.get(i), coordDegrees.get(i + 1),
                coordDegrees.get(i + 2), coordDegrees.get(i + 3)));

    dist.add(greatCirDist(coordDegrees.get(coordDegrees.size() - 2),
            coordDegrees.get(coordDegrees.size() - 1), coordDegrees.get(0), coordDegrees.get(1)));

    return dist;
  }

}
