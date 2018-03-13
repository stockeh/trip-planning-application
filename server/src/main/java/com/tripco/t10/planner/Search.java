package com.tripco.t10.planner;

import com.mysql.jdbc.StringUtils;

import java.sql.*;
import java.util.ArrayList;

public class Search {
  //fields for query tffi object
  public int version;
  public String type;
  public String query;
  public ArrayList<Place> places;

  // db configuration information
  private String baseSearch = "select id,name,municipality,latitude,longitude,type from airports where id = ";
  private final static String myDriver = "com.mysql.jdbc.Driver";
  private final static String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  //call with args[0] = username args[1] = password and args[2] = query
  public static void main(String[] args){
    String search = "select id,name,municipality,latitude,longitude,type from airports where name like '%" + args[2] +"%'" +
      "or municipality like '%" + args[2] +"%' order by municipality,name limit 10";
    try {
      Class.forName(myDriver);
// connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, args[0], args[1]);
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

  public void find(){
    baseSearch += "'" + query +"'";
    this.searchColumns();
    baseSearch += "limit 10";
    try {
      Class.forName(myDriver);
// connect to the database and query
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement sState = conn.createStatement();
           ResultSet rState = sState.executeQuery(baseSearch);
      ) {
        while(rState.next()){
          places.add(new Place(rState.getString("id"),rState.getString("name"),
            rState.getString("latitude"),rState.getString("longitude")));
        }
      }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
    }

    places.add(new Place("Sea","Seattle","47.6062° N","122.3321° W"));
  }

}
