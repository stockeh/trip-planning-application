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

    this.map = svg();
    this.distances = legDistances();
    System.out.println("TRIP.java - trip.title: " + this.title + ", type: " + this.type);
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg() {
    GatherSVG gsvg = new GatherSVG();
    String ColoradoBG = gsvg.readInSVG("/Colorado.svg");
    String SVGLines = gsvg.getSVGLines();
    //* System.out.println(ColoradoBG); Verification of Colorado.svg */
    return "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">" +
            ColoradoBG + "<svg width=\"1066.6073\" height=\"783.0824\"> " +
            SVGLines + "</svg></svg>";
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  public ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();
    CoordinateDistance distance = new CoordinateDistance(this.options.distance);

    for (int i = 0; i < this.places.size() - 1; i++) /* Append all dest1 < - > dest2 to dist */
      dist.add(distance.greatCirDist(this.places.get(i).latitude, this.places.get(i).longitude,
          this.places.get(i + 1).latitude, this.places.get(i + 1).longitude));

    dist.add(distance.greatCirDist(this.places.get(this.places.size() - 1).latitude,
          this.places.get(this.places.size() - 1).longitude, this.places.get(0).latitude, this.places.get(0).longitude));
    return dist;
  }

}