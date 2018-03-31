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
//    System.out.println("TRIP: " + optimization);
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
    this.map = svg(decimalDegrees);
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
   * Returns an SVG containing the background and the legs of the trip.
   *
   * @see GatherSVG class to get SVG components, i.e., map, lines and points.
   * @return Returns the completed string containing an SVG.
   */
  private String svg(ArrayList<Double> decimalDegrees) {
    GatherSVG gsvg = new GatherSVG();
    String ColoradoBG = gsvg.readInSVG("/Colorado.svg");
    String SVGLines = gsvg.getSVGLines(decimalDegrees);
    return "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">" +
            ColoradoBG + "<svg id=\"svg_0\" width=\"1066.6073\" height=\"783.0824\" y=\"35\" x=\"35\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">>" +
            SVGLines + "</svg></svg>";
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
    ArrayList<Integer> dist = new ArrayList<Integer>();
    Distance distance = new Distance(this.options);

    if (!distance.options.optimization.equals("none")) {
      double rounded = Math.round(Double.parseDouble(distance.options.optimization));
      distance.options.optimization = Double.toString(rounded);
    }
    else {
      distance.options.optimization = "0.0";
    }
    if (distance.options.optimization.equals("1.0")) {
      dist = distance.nearestNeighbor(coordDegrees, this.places);
      System.out.println("Nearest Neighbor");
    }
    else {
      dist = distance.inOrder(coordDegrees);
      System.out.println("In Order");
    }
    distance.memo = null;
    return dist;
  }

}