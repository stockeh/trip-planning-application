package com.tripco.t10.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class Search {
  //fields for query tffi object
  public int version;
  public String type;
  public String query;
  public ArrayList<Place> places;
  public Filter[] filters;

  private transient String join = "SELECT a.id, a.name, "
          + "a.municipality, region.name, "
          + "country.name, continents.name, a.type, a.latitude, "
          + "a.longitude FROM continents "
          + "INNER JOIN country ON continents.id = country.continent "
          + "INNER JOIN region ON country.id = region.iso_country "
          + "INNER JOIN airports as a ON region.id = a.iso_region WHERE ";
  private transient String orderBy = "ORDER BY continents.name, country.name, "
          + "region.name, a.municipality, a.name limit 15";
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  /**
   * Some defaults for the Search object.
   */
  public Search() {
    this.version = 3;
    this.type = "query";
    this.query = "";
  }

  /**
   * Adds AND statements to query based on the filter array it receives.
   * @param filter is the filter to iterate over.
   */
  public void iterateFilter(Filter filter){
    join += "AND ("; //open combination statement
    for(int index = 0; index < filter.size(); index++){
      if(index > 1){
        join += " OR ";
      }
      join += filter.getAttribute() + "='" + filter.get(index) + "'";
    }
    join += ") "; //close combination statement
  }

  /**
   * Adds filtering to the query.
   * Calls iterateFilter method for actual construction of statement.
   *
   */
  public void constructQueryFromFilters(){
    if(filters != null && filters.length > 0){
      for(Filter f : filters){
        if(f.getAttribute()!="" && !f.isEmpty()) {
          iterateFilter(f);
        }
      }
    }
  }

  /**
   * Constructs query and calls accessDatabase to perform query.
   * Constructs places array from query results
   */
  public void find() {
    join += "(a.name LIKE '%" + query + "%' OR country.name LIKE '%" + query
            + "%' OR region.name LIKE '%" + query + "%' OR continents.name LIKE '%" + query
            + "%' OR a.id LIKE '%" + query
            + "%' OR a.municipality LIKE '%" + query
            + "%' OR a.type LIKE '%" + query
            + "%' OR a.longitude LIKE '%" + query
            + "%' OR a.latitude LIKE '%" + query + "%') ";
    constructQueryFromFilters();
    join += orderBy;
    System.out.println(join);
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
