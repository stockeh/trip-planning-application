package com.tripco.t10.planner;

import java.util.ArrayList;

public class Filter {
  public String attribute;
  public ArrayList<String> values;

  /**
   * Filter Constructor.
   * @param attribute is column name of filter
   * @param values is array of filter values associated with attribute
   */
  public Filter(String attribute,ArrayList<String> values){
    this.attribute = attribute;
    this.values = values;
  }

  /**
   * gets attribute of filter.
   * @return filters attribute
   */
  public String getAttribute(){
    return this.attribute;
  }

  /**
   * Empty method of Filter object.
   * @return true if values array is empty
   */
  public boolean isEmpty(){
    return this.values.isEmpty();
  }

  /**
   * Size method of Filter object.
   * @return size of values array
   */
  public int size(){
    return this.values.size();
  }

  /**
   * Get method of Filter object.
   * @param i is index of object to fetch
   * @return String of of values at index i
   */
  public String get(int index){
    return this.values.get(index);
  }

  /**
   * Print method for filter.
   * @return Filter to String
   */
  public String toString(){
    return "Attribute: " + this.attribute + " Values: " + values;
  }

}
