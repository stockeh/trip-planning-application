package com.tripco.t10.planner;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public String latitude;
  public String longitude;
  public String country;
  public String region;
  public String municipality;
  public String continent;

  /**
   * Place constructor is used for testing.
   * @param id is id of place
   * @param name is name of place
   * @param latitude is latitude of place
   * @param longitude is longitude of place
   */
  public Place(String id, String name, String latitude, String longitude){
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Place constructor used by Search to give place more information
   * @param place is an array of all place variables
   */
  public Place(String[] place){
    this.continent = place[0];
    this.region = place[1];
    this.country = place[2];
    this.municipality = place[3];
    this.latitude = place[4];
    this.longitude = place[5];
    this.name = place[6];
    this.id = place[7];
  }
}

