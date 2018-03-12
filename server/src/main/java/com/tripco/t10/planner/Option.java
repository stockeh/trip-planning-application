package com.tripco.t10.planner;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {

  public String distance;
  public String userUnit;
  public String userRadius;
  public double optimization;

  public Option(){
    this.distance="";
    this.userUnit="";
    this.userRadius="";
    this.optimization=0;
  }

  public Option(String distance, double optimization){
    this.distance = distance;
    this.optimization = optimization;
  }

  public Option(String distance, String userUnit, String userRadius, double optimization){
    this.distance = distance;
    this.userUnit = userUnit;
    this.userRadius = userRadius;
    this.optimization = optimization;
  }
}
