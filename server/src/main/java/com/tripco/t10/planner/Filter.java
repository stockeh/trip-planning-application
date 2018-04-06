package com.tripco.t10.planner;

import java.util.ArrayList;

public class Filter {
  public String attribute;
  public ArrayList<String> values;

  /**
   *
   * @param attribute is column name of filter
   * @param values is array of filter values associated with attribute
   */
  public Filter(String attribute,ArrayList<String> values){
    this.attribute = attribute;
    this.values = values;
  }

  /**
   * to String method for filter
   * @return Filter to String
   */
  public String toString(){
    return "Attribute: " + this.attribute + " Values: " + values;
  }

}
