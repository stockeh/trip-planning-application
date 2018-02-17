package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t10.server.HTTP;
import spark.Request;

import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;

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
    System.out.println(ColoradoBG); // Verification of Colorado.svg
    System.out.println(SVGLines); // Verification of SVGLines
    return "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">" +
            ColoradoBG + "<svg id=\"svg_0\" width=\"1066.6073\" height=\"783.0824\" y=\"35\" x=\"35\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">>" +
            SVGLines + "</svg></svg>";
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();
    if (this.places != null) {
      if (!this.places.get(0).latitude.isEmpty()) { /* Temp. while still integrating itinerary. */
        CoordinateDistance distance = new CoordinateDistance(this.options.distance);

        for (int i = 0; i < this.places.size() - 1; i++) /* Append all dest1 < - > dest2 to dist */
          dist.add(distance.greatCirDist(this.places.get(i).latitude, this.places.get(i).longitude,
                  this.places.get(i + 1).latitude, this.places.get(i + 1).longitude));

        dist.add(distance.greatCirDist(this.places.get(this.places.size() - 1).latitude,
                this.places.get(this.places.size() - 1).longitude, this.places.get(0).latitude, this.places.get(0).longitude));

      }
    }
    dist.add(12);
    dist.add(23);
    dist.add(34);
    dist.add(45);
    dist.add(65);
    dist.add(19);

    return dist;
  }

}