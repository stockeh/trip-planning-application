package com.tripco.t10.planner;

import java.lang.Math;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {

  public String distance;
  public String userUnit;
  public String userRadius;
  public String optimization;
  public String map;

  public Option(){
    this.optimization = "0.0";
    this.distance = "miles";
  }

  /**
   * For testing with version 1
   * @param distance is an option
   * @param optimization is an option
   */
  public Option(String distance, double optimization){
    this.distance = distance;
    this.optimization = Double.toString(Math.round(2.0*optimization)/2.0);
  }

  /**
   * For testing with version 2
   * @param distance is an option
   * @param userUnit is an option
   * @param userRadius is an option
   * @param optimization is an option
   */
  public Option(String distance, String userUnit, String userRadius, double optimization, String map){
    this.distance = distance;
    this.userUnit = userUnit;
    this.userRadius = userRadius;
    this.optimization = Double.toString(Math.round(2.0*optimization)/2.0);
    this.map = map;
  }
}
