package com.tripco.t10.planner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.*;

public class CoordinateDistance {

  public String distance;

  public CoordinateDistance() { this.distance = "miles"; }; /** Default to "miles" **/

  public CoordinateDistance(String distance) { this.distance = distance; }

  /*Converts passed location string array to decimal degrees
  Returns -1000 if conversion fails
   */


  public double convertToRadian(double angle) {
//    if (angle.isEmpty()) angle += "0";
    if(angle == -1000)return -1;
    return angle * (Math.PI / 180);
  }

  public int greatCirDist(double latitude1, double longitude1, double latitude2, double longitude2) {
    double deltaX, deltaY, deltaZ, radius, chordLen, centralAngle;

    if (this.distance == "kilometers")
      radius = 6371.0088;
    else radius = 3958.7613;
    double decLat1 = this.convertToRadian(latitude1);
    double decLat2 = this.convertToRadian(latitude2);
    double decLong1 = this.convertToRadian(longitude1);
    double decLong2 = this.convertToRadian(longitude2);
    if(decLat1 == -1 || decLat2 == -1 || decLong1 == -1 || decLong2 == -1)return -1;
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
