package com.tripco.t10.planner;

public class CoordinateDistance {

  public String distance;

  public CoordinateDistance() { this.distance = "miles"; }; /** Default to "miles" **/

  public CoordinateDistance(String distance) { this.distance = distance; }

  public double parseLatLong(String coordinate, boolean isLatitude){
    return 0;
  }

  public double convertToRadian(String angle) {
    if (angle.isEmpty()) angle += "0";
    return Double.parseDouble(angle) * (Math.PI / 180);
  }

  public int greatCirDist(String latitude1, String longitude1, String latitude2, String longitude2) {
    double deltaX, deltaY, deltaZ, radius, chordLen, centralAngle;

    if (this.distance == "kilometers")
      radius = 6371.0088;
    else radius = 3958.7613;

    deltaX = Math.cos(this.convertToRadian(latitude2)) * Math.cos(this.convertToRadian(longitude2)) -
            Math.cos(this.convertToRadian(latitude1)) * Math.cos(this.convertToRadian(longitude1));
    deltaY = Math.cos(this.convertToRadian(latitude2)) * Math.sin(this.convertToRadian(longitude2)) -
            Math.cos(this.convertToRadian(latitude1)) * Math.sin(this.convertToRadian(longitude1));
    deltaZ = Math.sin(this.convertToRadian(latitude2)) - Math.sin(this.convertToRadian(latitude1));

    chordLen = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2) + Math.pow(deltaZ,2));
    centralAngle = 2 * Math.asin(chordLen / 2);

    return (int)Math.round(radius * centralAngle);
  }

}
