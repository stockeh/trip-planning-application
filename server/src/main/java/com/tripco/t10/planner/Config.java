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
//  public ArrayList<Filter> filters = new ArrayList<>();
  public Filter[] filters = new Filter[1];
//  public String[] filters = {"\"attribute\" : \"type\", \"values\" : \"[\"baloonport\",\"heliport\"]\""};


  public Config(){
    // plan the trip.
    filters[0]= new Filter("type",new String[]{"airport","heliport"});
//    Search filter = new Search();
//    this.filters[0] = (new Filter("type",filter.getFilterColumn("type")));
//    this.findFilters();
  }




}
