package com.tripco.t10.planner;

import java.sql.*;
import java.util.ArrayList;

public class Search {
  //fields for query tffi object
  public int version;
  public String type;
  public String query;
  public ArrayList<Place> places;
  public ArrayList<Filter> filters;

  private transient String join = "SELECT airports.id, airports.name, airports.municipality, region.name, "
          + "country.name, continents.name, airports.type, airports.latitude, airports.longitude FROM continents "
          + "INNER JOIN country ON continents.id = country.continent "
          + "INNER JOIN region ON country.id = region.iso_country "
          + "INNER JOIN airports ON region.id = airports.iso_region WHERE ";
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  /**
   * Some defaults for the Search object.
   */
  public Search() {
    this.version = 2;
    this.type = "query";
    this.query = "";
  }

  /**
   * Constructs query
   * Calls accessDatabase to perform query
   * Constructs places array from query results
   */
  public void find() {
    join += "airports.name LIKE '%" + query + "%' OR country.name LIKE '%" + query
            + "%' OR region.name LIKE '%" + query + "%' OR continents.name LIKE '%" + query
            + "%' OR airports.id LIKE '%" + query
            + "%' OR airports.municipality LIKE '%" + query
            + "%' OR airports.type LIKE '%" + query
            + "%' OR airports.longitude LIKE '%" + query
            + "%' OR airports.latitude LIKE '%" + query
            + "ORDER BY continents.name, country.name, region.name, airports.municipality, airports.name"
            + "%' limit 15";
    try {
      Class.forName(myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement sState = conn.createStatement();
           ResultSet rState = sState.executeQuery(join);
      ) {
        while (rState.next()) {
          this.places.add(new Place(rState.getString("id"), rState.getString("name"),
                  rState.getString("latitude"), rState.getString("longitude")));

        }
      }
    } catch (Exception e) {
      System.err.println("Exception: " + e.getMessage());
    }

  }
}
