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
  public double optimization;
  /**
   * For setting default values to options
   * primarily for GSON
   */
  public Option(){
    this.distance="";
    this.userUnit="";
    this.userRadius="";
    this.optimization=0;
  }

  /**
   * For testing with version 1
   * @param distance is an option
   * @param optimization is an option
   */
  public Option(String distance, double optimization){
    this.distance = distance;
    this.optimization = Math.round(optimization);
  }

  /**
   * For testing with version 2
   * @param distance is an option
   * @param userUnit is an option
   * @param userRadius is an option
   * @param optimization is an option
   */
  public Option(String distance, String userUnit, String userRadius, double optimization){
    this.distance = distance;
    this.userUnit = userUnit;
    this.userRadius = userRadius;
    this.optimization = Math.round(optimization);
  }
}
