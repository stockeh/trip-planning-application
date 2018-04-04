package com.tripco.t10.planner;

import com.mysql.jdbc.StringUtils;

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

  private String baseSearch = "SELECT id,name,municipality,"
    + "latitude,longitude,type FROM airports WHERE ";
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  /**
   * Some defaults for the Search object.
   */
  public Search(){
    this.version = 2;
    this.type = "query";
    this.query = "";
  }

  public String[] getFilterColumns(){
    String typeFilter = "SELECT distinct type from airports;";
    ResultSet rState = accessDatabase(typeFilter);

    try {
      while (rState.next()) {

      }
    } catch (Exception e){
      System.err.println("Exception: "+e.getMessage());
    }
  }

  /**
   * Constructs query
   * Calls accessDatabase to perform query
   * Constructs places array from query results
   */
  public void find(){
    baseSearch += "name LIKE '%" + query
      + "%' OR id LIKE '%" + query
      + "%' OR municipality LIKE '%" + query
      + "%' OR type LIKE '%" + query
      + "%' OR longitude LIKE '%" + query
      + "%' OR latitude LIKE '%" + query
      + "%' limit 15";
    System.out.println(baseSearch);
    ResultSet rState = accessDatabase(baseSearch);
    try {
      while (rState.next()) {
        this.places.add(new Place(rState.getString("id"), rState.getString("name"),
          rState.getString("latitude"), rState.getString("longitude")));
      }
    } catch (Exception e){
      System.err.println("Exception: "+e.getMessage());
    }
  }

  /**
   * accesses database and performs search on query
   * @param query is query to be performed by method
   * @return the result set from the query or null
   */
  public ResultSet accessDatabase(String query){
    try {
      Class.forName(myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement sState = conn.createStatement();
           ResultSet rState = sState.executeQuery(query)
      ){
        return rState;
      }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
    }
    return null;
  }

}
