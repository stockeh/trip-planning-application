package com.tripco.t10.planner;

import java.util.ArrayList;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.

  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  public Trip(ArrayList<Place> places, String distance){
    this.places = places;
    this.options = new Option(distance,"");
  }

  public void setOptions(String distance){
    this.options = new Option(distance, "");
  }

  public void setPlaces(ArrayList<Place> placeList){
    places = placeList;
  }

  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void plan() {
    ArrayList<Double> decimalDegrees = getDecimalDegrees();
    this.map = svg(decimalDegrees);
    this.distances = legDistances(decimalDegrees);
    // System.out.println("TRIP.java - trip.title: " + this.title + ", type: " + this.type);
  }

  public ArrayList<Double> getDecimalDegrees(){
    Parser parser = new Parser();
    ArrayList<Double> decimalDegrees = new ArrayList<Double>();
    for(Place place : places){
      decimalDegrees.add(parser.parseLatLong(place.latitude,true));
      decimalDegrees.add(parser.parseLatLong(place.longitude,false));
    }
    return decimalDegrees;
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg(ArrayList<Double> decimalDegrees) {
    GatherSVG gsvg = new GatherSVG();
    String ColoradoBG = gsvg.readInSVG("/Colorado.svg");
    String SVGLines = gsvg.getSVGLines(decimalDegrees);
//    System.out.println(ColoradoBG); // Verification of Colorado.svg
//    System.out.println(SVGLines); // Verification of SVGLines
    return "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">" +
            ColoradoBG + "<svg id=\"svg_0\" width=\"1066.6073\" height=\"783.0824\" y=\"35\" x=\"35\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">>" +
            SVGLines + "</svg></svg>";
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  public ArrayList<Integer> legDistances(ArrayList<Double> coordDegrees) {
    ArrayList<Integer> dist = new ArrayList<Integer>();
    CoordinateDistance distance = new CoordinateDistance(this.options.distance);

    if (coordDegrees.size() > 0)
    for (int i = 0; i < coordDegrees.size() - 2; i += 2) /* Append all dest1 < - > dest2 to dist */
      dist.add(distance.greatCirDist(coordDegrees.get(i), coordDegrees.get(i+1),
          coordDegrees.get(i+2), coordDegrees.get(i+3)));

    dist.add(distance.greatCirDist(coordDegrees.get(coordDegrees.size()-2),
          coordDegrees.get(coordDegrees.size()-1), coordDegrees.get(0), coordDegrees.get(1)));
    return dist;
  }

}