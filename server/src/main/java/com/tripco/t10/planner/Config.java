package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

import java.util.ArrayList;

public class Config {
  public String type = "config";
  public String version = "3";
  public String optimization = "1";
  public String[] distances = {"miles","kilometers","nautical miles","user defined"};
  public String[] maps = {"svg"};
  public ArrayList<Filter> filters = new ArrayList<>();
//  public String[] filters = {"\"attribute\" : \"type\", \"values\" : \"[\"baloonport\",\"heliport\"]\""};


  public Config(){
    // plan the trip.
//    ArrayList<String> test = new ArrayList<String>();
//    test.add("airport");
//    test.add("heliport");
    Search filter = new Search();
    this.filters.add(new Filter("type",filter.getFilterColumn("type")));
//    this.findFilters();
  }

//  public void findFilters(){
//    Search filter = new Search();
//
//  }



}
