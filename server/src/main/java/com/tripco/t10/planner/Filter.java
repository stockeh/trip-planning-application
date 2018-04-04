package com.tripco.t10.planner;

import java.util.ArrayList;

public class Filter {
  public String attribute;
  public ArrayList<String> values = new ArrayList<>();

  public Filter(String attribute,ArrayList<String> values){
    this.attribute = attribute;
    this.values = values;
  }

  public String toString(){
    return "Attribute: " + this.attribute + " Values: " + values;
  }

}
