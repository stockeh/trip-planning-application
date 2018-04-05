package com.tripco.t10.planner;

import java.util.ArrayList;

public class Filter {
  public String attribute;
//  public ArrayList<String> values = new ArrayList<>();
  public String[] values;

  public Filter(String attribute,String[] values){
    this.attribute = attribute;
    this.values = values;
  }

  public String toString(){
    return "Attribute: " + this.attribute + " Values: " + values;
  }

}
