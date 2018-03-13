package com.tripco.t10.planner;

import java.util.ArrayList;

public class Search {
  public int version;
  public String type;
  public String query;
  public ArrayList<Place> places;

  public void find(){
    places.add(new Place("Sea","Seattle","47.6062° N","122.3321° W"));
  }
}
