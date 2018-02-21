package com.tripco.t10.planner;

import java.util.ArrayList;

/**
 * The Distance class is responsible for calculating the distance between
 * two decimal coordinates.
 */
public class Distance {
  // Defining variables and constructors

  public String distance;

  /**
   * Constructor that sets the distance global to the correct units,
   * i.e.,"miles" or "kilometers".
   *
   * @param distance the units in the trip.
   * @see Trip class for trip variables.
   */
  public Distance(String distance) { this.distance = distance; }

  /**
   * Computes the grate circle distance between two coordinates.  The distance units
   * provided from the constructor determine the radius for the computation.
   *
   * @see Trip#legDistances(ArrayList) method used the distance to populate distances.
   * @see Trip#getDecimalDegrees()
   * @param latitude1 initial latitude in decimal degrees.
   * @param longitude1 initial longitude in decimal degrees.
   * @param latitude2 terminal latitude in decimal degrees.
   * @param longitude2 terminal longitude in decimal degrees.
   * @return Returns the rounded distance between two coordinate points in decimal degrees.
   */
  public int greatCirDist(double latitude1, double longitude1, double latitude2, double longitude2) {
    double deltaX, deltaY, deltaZ, radius, chordLen, centralAngle;

    if (this.distance.equals("kilometers"))
      radius = 6371.0088;
    else radius = 3958.7613;

    double decLat1 = this.convertToRadian(latitude1);
    double decLat2 = this.convertToRadian(latitude2);
    double decLong1 = this.convertToRadian(longitude1);
    double decLong2 = this.convertToRadian(longitude2);

    deltaX = Math.cos(decLat2) * Math.cos(decLong2) -
            Math.cos(decLat1) * Math.cos(decLong1);
    deltaY = Math.cos(decLat2) * Math.sin(decLong2) -
            Math.cos(decLat1) * Math.sin(decLong1);
    deltaZ = Math.sin(decLat2) - Math.sin(decLat1);

    chordLen = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2) + Math.pow(deltaZ,2));
    centralAngle = 2 * Math.asin(chordLen / 2);

    return (int)Math.round(radius * centralAngle);
  }

}
