package com.tripco.t10.planner;

public class CoordinateDistance {

  private String distance;

  public CoordinateDistance() { this.distance = "miles"; }; /** Default to "miles" **/

  public CoordinateDistance(String distance) { this.distance = distance; }

  public int greatCirDist(String latitude1, String longitude1, String latitude2, String longitude2) {
    double deltaX, deltaY, deltaZ, radius, chordLen, centralAngle;

    if (this.distance == "kilometers")
      radius = 6371.0088;
    else radius = 3958.7613;

    return (int)Math.round(radius);
  }

}
