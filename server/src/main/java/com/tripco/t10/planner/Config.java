package com.tripco.t10.planner;

import java.sql.*;
import java.util.ArrayList;
import java.lang.*;

public class Config {
  public String type = "config";
  public String version = "3";
  public String optimization = "1";
  public String[] distances = {"miles","kilometers","nautical miles","user defined"};
  public String[] maps = {"svg"};
  public ArrayList<Filter> filters = new ArrayList<>();

  private static String[] filterColumns = new String[]{"type"};
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  public Config(){
    // plan the trip.
    for(String column : filterColumns){
      findFilters(column);
    }
  }

  public void findFilters(String column){
    String query = "SELECT distinct " + column + " from airports";

    try {
      Class.forName(myDriver);
      try (Connection conn = DriverManager.getConnection(myUrl, "evanjs", "830960621");
           Statement sState = conn.createStatement();
           ResultSet rState = sState.executeQuery(query);

      ) {
        ArrayList<String> filterList = new ArrayList<>();
        while(rState.next()){
          filterList.add(rState.getString(column));
        }
        filters.add(new Filter(column,filterList));

      }
    } catch (Exception e){
      System.err.println("Exception: " + e.getMessage());
    }
  }




}
