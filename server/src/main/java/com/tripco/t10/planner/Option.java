package com.tripco.t10.planner;

import java.lang.Integer;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {

  public String distance;
  public String optimization;

  public Option(String distance, String optimization){
    this.distance = distance;
    this.optimization = optimization;
  }
}