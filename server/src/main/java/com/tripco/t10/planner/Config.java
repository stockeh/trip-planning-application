package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

public class Config {
  public String type = "config";
  public String version = "3";
  public String optimization = "1";
  public String distances[] = {"miles","kilometers","nautical miles","user defined"};
  public String maps[] = {"svg"};
  public String filters[];


  public Config (Request request){
    // plan the trip.
    this.findFilters();
  }

  private void findFilters(){

  }



}
