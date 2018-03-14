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

  private String baseSearch = "select id,name,municipality," +
    "latitude,longitude,type from airports where id = ";
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  /**
   * Some defaults for the Search object
   */
  public Search(){
    this.version = 2;
    this.type = "query";
    this.query = "";
  }

  /**
   * For testing the search function off campus
   * @param args  args[0] = query
   */
  public static void main(String[] args){
    String search = "select id,name,municipality,latitude," +
      "longitude,type from airports where name like '%" + args[0] +"%'" +
      "or municipality like '%" + args[2] +"%' " +
      "order by municipality,name limit 10";
    try {
      Class.forName(myDriver);
// connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement stCount = conn.createStatement();
           ResultSet rsCount = stCount.executeQuery(search);
      ) {
        while (rsCount.next()) {
          System.out.printf(" \"%s\"", rsCount.getString("name") + " " + rsCount.getString("id"));
          System.out.println();
        }
//        System.out.printf(" ]\n}\n");
      }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
    }
  }

  /**
   * decides which columns to search in based on query and
   * sets up the search query accordingly
   */
  public void searchColumns(){
    if(query.matches(".*\\d+.*")){
      baseSearch += "or latitude = '" + query + "'or longitude = '" + query + "'";
      baseSearch += " order by id,latitude,longitude";
    }else if(query.contains("airport") || query.contains("heliport")){
      baseSearch +="or name like '%" + query + "%' or type like '%" + query + "%'";
      baseSearch += " order by id,name,type";
    }else{
      baseSearch +="or municipality like '%" + query + "%' or name like '%" + query + "%'";
      baseSearch += " order by id,municipality,name";
    }
  }

  /**
   * searches database from constructed query and
   * updates places variable of object accordingly
   */
  public void find(){
    baseSearch += "'" + query +"'";
    this.searchColumns();
    baseSearch += " limit 10";
    try {
      Class.forName(myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement sState = conn.createStatement();
           ResultSet rState = sState.executeQuery(baseSearch);
      ) {
        while(rState.next()){
          this.places.add(new Place(rState.getString("id"),rState.getString("name"),
            rState.getString("latitude"),rState.getString("longitude")));
        }
      }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
    }
  }

}
