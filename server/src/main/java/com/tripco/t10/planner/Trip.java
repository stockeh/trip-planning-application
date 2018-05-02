package com.tripco.t10.planner;

import java.util.ArrayList;
import java.util.Iterator;
import java.lang.Double;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */

public class Trip {
  // The variables in this class should reflect TFFI.

  public int version;
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  public Trip(){
    this.version=1;
  }

  /**
   * Used for testing v1 trips.
   * @param places destinations of the trip
   * @param distance units for the trip.
   */
  public Trip(ArrayList<Place> places, String distance){
    this.places = places;
    this.options = new Option(distance, 0);
  }

  /**
   * Constructor used for testing v2 trips.
   * @param places destinations for the trip
   * @param distance units for the trip
   * @param optimization level of optimization as a double. Between 0-1.
   */
  public Trip(ArrayList<Place> places, String distance, double optimization){
    this.places = places;
    this.options = new Option(distance, optimization);
  }

  public void setOptions(String distance, double optimization){
    this.options = new Option(distance, optimization);
  }

  /**
   * Method used to set the places global for testing.
   * @param placeList
   */
  public void setPlaces(ArrayList<Place> placeList){
    places = placeList;
  }


  /**
   * The top level method that does planning.
   * Adds the map and distances for the places in order.
   * Additionally sets an ArrayList of doubles equal to the places corresponding
   * coordinates in decimal degrees.
   *
   * It might need to reorder the places in the future.
   *
   */
  public void plan() {
    ArrayList<Double> decimalDegrees = getDecimalDegrees();
    this.distances = legDistances(decimalDegrees);
    decimalDegrees = getDecimalDegrees();
    if (this.options.map != null) {
      this.map = (this.options.map.toLowerCase().equals("svg"))
          ? svg(decimalDegrees) : googleMap(decimalDegrees);
    }
    else {
      this.options.map = "kml";
      this.map = googleMap(decimalDegrees);
    }
  }

  /**
   * Travers the places within the trip.  Converting each latitude and longitude
   * to be in correct decimal degree values.  Invalid coordinates will return -1000,
   * otherwise an array of latitude and longitude pairs are returned
   *
   * @see Parser Handels parsing and error checking coordinate input.
   * @return Returns the pair of latitude and longitude coordinates for each place.
   */
  public ArrayList<Double> getDecimalDegrees(){
    Parser parser = new Parser();
    ArrayList<Double> decimalDegrees = new ArrayList<Double>();
    Iterator<Place> iterator = places.iterator();
    while(iterator.hasNext()){
        Place place = iterator.next();
        double latitude = parser.parseLatLong(place.latitude,true);
        double longitude = parser.parseLatLong(place.longitude,false);
        if(latitude != -1000 && longitude != -1000){decimalDegrees.add(latitude); decimalDegrees.add(longitude);}
        else iterator.remove();
    }
    return decimalDegrees;
  }

  /**
   * Resolved duplicated code.
   * @param decimalCoordinates Contains the decimal degrees for each place.
   * @param index location of current coordinates in ArrayList.
   * @return A pair of coordinates.
   */
  private String buildCoordinates(ArrayList<Double> decimalCoordinates, int index) {
    return " " + Double.toString(decimalCoordinates.get(index + 1))
        + "," + Double.toString(decimalCoordinates.get(index));
  }

  /**
   * Builds a string in kml format to then be loaded back on the server.
   * @param decimalCoordinates Contains the decimal degrees for each place.
   * @return returns a string in kml format with the latitude/longitude under coordinates.
   */
  private String googleMap(ArrayList<Double> decimalCoordinates) {
    String kmlHeader = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>"
        + "<kml xmlns='http://www.opengis.net/kml/2.2' xmlns:atom='http://www.w3.org/2005/Atom' "
        + "xmlns:xal='urn:oasis:names:tc:ciq:xsdschema:xAL:2.0' xmlns:gx='http://www.google.com/kml/ext/2.2'>"
        + "<Placemark><LineString><altitudeMode>clampToGround</altitudeMode><coordinates>";
    String startingLocation = "";
    String coordinates = "";
    for (int index = 0; index < decimalCoordinates.size()-1; index += 2) {
      if (index == 0) {
        startingLocation = buildCoordinates(decimalCoordinates, index);
      }
      coordinates += buildCoordinates(decimalCoordinates, index);
    }
    String kmlFooter = "</coordinates></LineString></Placemark></kml>";
    return kmlHeader + coordinates + startingLocation + kmlFooter;
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * Version 1/2 trips will default to using the Colorado.svg.
   * Version 3+ will default to using the World.svg map.
   * @see GatherSVG class to get SVG components, i.e., map, lines and points.
   * @param decimalDegrees Contains the decimal degrees for each place.
   * @return Returns the completed string containing an SVG.
   */
  private String svg(ArrayList<Double> decimalDegrees) {
    GatherSVG gsvg = new GatherSVG();
    String background;
    double width= 1066.6073;
    double height= 783.0824;
    double boarder = 35;

    if (this.version == 3) {
      width= 1024;
      height= 512;
      boarder = 0;
      gsvg.setAxis(width, height);
      gsvg.setBounds(-180,180,90,-90);
      background = gsvg.readInSVG("/World.svg");
    }
    else {
      background = gsvg.readInSVG("/Colorado.svg");
    }
    String svgLines = gsvg.getsvgLines(decimalDegrees);
    return "<svg width=\"" + width + "\" height=\"" + height + "\" "
           + "xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">"
           + background
           + "<svg width=\""+ width +"\" height=\""+ height
           + "\" y=\"" + boarder + "\" x=\"" + boarder + "\">"
           + svgLines + "</svg></svg>";
  }

  /**
   * Used to sterilize the optimizations.  If string is not numeric it returns false.
   * @param str string of the optimization.
   * @return true if valid double, false otherwise.
   */
  public boolean isNumeric(String str) {
    try {
      double test = Double.parseDouble(str);
    }
    catch(NumberFormatException nfe) {
      return false;
    }
    return true;
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @param coordDegrees Contains the decimal degrees for each place.
   *                     Alternating latitude(0), longitude(0), latitude(1),
   *                     longitude(1), ..., latitude(n), longitude(n).
   * @see #getDecimalDegrees()
   * @return Returns an ArrayList of Integers containing the distance between
   * valid locations.
   */
  public ArrayList<Integer> legDistances(ArrayList<Double> coordDegrees){
    ArrayList<Integer> dist;
    Distance distance = new Distance(this.options);

    if (!this.isNumeric(distance.options.optimization)) {
      distance.options.optimization = "0.0";
    }
    double optimization = Double.parseDouble(distance.options.optimization);

    if (optimization <= (1.0 / 4.0)) {
      distance.options.optimization = "0.0";
      dist = distance.inOrder(coordDegrees);
    }
    else if (optimization > (1.0 / 4.0) && optimization <= (2.0 / 4.0)) {
      distance.options.optimization = "0.33";
      dist = distance.nearestNeighbor(coordDegrees, this.places);
    }
    else if (optimization > (2.0 / 4.0) && optimization <= (3.0 / 4.0)) {
      distance.options.optimization = "0.66";
      dist = distance.twoOpt(coordDegrees, this.places);
    }
    else {
      distance.options.optimization = "1.0";
      dist = distance.threeOpt(coordDegrees, this.places);
    }
    distance.memo = null;
    return dist;
  }

}