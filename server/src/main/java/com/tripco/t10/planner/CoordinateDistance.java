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
  public double convertDecimalDegrees(double[] location){
    double decimalDegrees = 0;
    double divisor = 1.0;
    for(double d : location){
      decimalDegrees += (d/divisor);
      divisor *= 60;
    }
    return decimalDegrees;
  }

  //returns direction present in string or 0 if it doesn't have one.
  //coordinate should be inputted so that character is at end of string
  public char hasDirection(String coordinate){
    if(coordinate.length() > 0) {
      char c = coordinate.charAt(coordinate.length() - 1);
      if (c == 'N' || c == 'S' || c == 'W' || c == 'E') {
        return c;
      }
    }
    return '0';
  }

  //returns true if passed direction and degree is a valid Latitude coordinate and false otherwise
  public boolean validLatitude(char direction, double degree){
    if(direction == '0' || direction == 'N' || direction == 'S'){
      if(degree <= 41 && degree >= 37) return true;
    }
    return false;
  }

  //returns true if passed direction and degree is a valid longitude coordinate and false otherwise
  public boolean validLongitude(char direction, double degree){
    if(direction == '0' || direction == 'W' || direction == 'E'){
      if(degree <= -102.05 && degree >= -109.05) return true;
    }
    return false;
  }

  public double flipDegrees(char direction, double degree){
    if(direction == 'S' || direction == 'W')return -degree;
    else return degree;
  }

  //accepts location string without direction containing 0 spaces
  //returns array containing degrees minutes and seconds which are allocated to 0 if they weren't in the passed location
  public double[] getLocationArray(String coordinate){
    double[] location = {0,0,0};
    boolean isSimplified = true;
    try {
      if (coordinate.contains("°")) {
        isSimplified = false;
        int index = coordinate.indexOf('°');
        location[0] = Double.parseDouble(coordinate.substring(0, index));
        coordinate = coordinate.substring(index+1);
      }
      if (coordinate.contains("'")) {
        isSimplified = false;
        int index = coordinate.indexOf('\'');
        location[1] = Double.parseDouble(coordinate.substring(0, index));
        coordinate = coordinate.substring(index+1);
      }
      if (coordinate.contains("\"")) {
        isSimplified = false;
        int index = coordinate.indexOf('"');
        location[2] = Double.parseDouble(coordinate.substring(0, index));
        coordinate = coordinate.substring(index+1);
      }
      if (isSimplified && coordinate !="") location[0] = Double.parseDouble(coordinate);
      return location;
    }catch (NumberFormatException e){
      return null;
    }
  }


  //accepts a coordinate string and a boolean that is true for latitude and false for longitude
  //parses coordinate string returning coordinate string converted to decimal degrees
  //returns -1000 if string is invalid
  public double parseLatLong(String coordinate, boolean isLatitude){
    coordinate = coordinate.trim();  //trim spaces from front and back of string
    Pattern format = Pattern.compile("^\\s*(?:(?:-?\\d+(?:\\.\\d+)?)|(?:-?\\d+(?:\\.\\d+)?\\s*°)?(?:\\s*-?\\d+(?:\\.\\d+)?\\s*['|`|'|‘|’|′])?(?:\\s*-?\\d+(?:\\.\\d+)?\\s*[\"|”|“|″])?)\\s*[N|S|E|W]?\\s*$");
    Matcher verifier = format.matcher(coordinate);
    if(verifier.matches()) {  //check if string matches format
      char direction = hasDirection(coordinate);  //parse direction from string
      coordinate.replaceAll("['|`|'|‘|’|′]","'");
      coordinate.replaceAll("[\"|”|“|″]","\"");
      coordinate = coordinate.replaceAll("[N|S|E|W]","");  //remove direction from string
      coordinate = coordinate.replaceAll("\\s+", "");   //remove unnecessary spaces to prepare for split into array
      double[] location = getLocationArray(coordinate);

      if(location == null) return -1000;

      double decimalDegrees = convertDecimalDegrees(location);
      decimalDegrees = flipDegrees(direction,decimalDegrees);

      if(isLatitude) {
        if (validLatitude(direction, decimalDegrees)) return decimalDegrees;
      }else if(!isLatitude){
        if(validLongitude(direction,decimalDegrees)) return decimalDegrees;
      }
    }
    return -1000;
  }

  public double convertToRadian(Double angle) {
//    if (angle.isEmpty()) angle += "0";
    return angle * (Math.PI / 180);
  }

  public int greatCirDist(String latitude1, String longitude1, String latitude2, String longitude2) {
    double deltaX, deltaY, deltaZ, radius, chordLen, centralAngle;

    if (this.distance == "kilometers")
      radius = 6371.0088;
    else radius = 3958.7613;
    double decLat1 = parseLatLong(latitude1,true);
    double decLat2 = parseLatLong(latitude2,true);
    double decLong1 = parseLatLong(longitude1,false);
    double decLong2 = parseLatLong(longitude2,false);
    if(decLat1 == -1000 || decLat2 == -1000 || decLong1 == -1000 || decLong2 == -1000)return -1;
    deltaX = Math.cos(this.convertToRadian(decLat2)) * Math.cos(this.convertToRadian(decLong2)) -
            Math.cos(this.convertToRadian(decLat1)) * Math.cos(this.convertToRadian(decLong1));
    deltaY = Math.cos(this.convertToRadian(decLat2)) * Math.sin(this.convertToRadian(decLong2)) -
            Math.cos(this.convertToRadian(decLat1)) * Math.sin(this.convertToRadian(decLong1));
    deltaZ = Math.sin(this.convertToRadian(decLat2)) - Math.sin(this.convertToRadian(decLat1));

    chordLen = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2) + Math.pow(deltaZ,2));
    centralAngle = 2 * Math.asin(chordLen / 2);

    return (int)Math.round(radius * centralAngle);
  }

}
