package com.tripco.t10.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


public class Config {
  public String type = "config";
  public int version = 3;
  public ArrayList<Filter> filters = new ArrayList<>();
  public String[] maps = {"svg"};
  public int optimization = 1;
  public String[] units = {"miles","kilometers","nautical miles","user defined"};

  //add to this filterColumns array to add more filter columns
  private static String[] filterColumns = new String[]{"type"};
  private static final String myDriver = "com.mysql.jdbc.Driver";
  private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";

  /**
   * Config constructor finds the filters.
   */
  public Config(){
    // plan the trip.
    for(String column : filterColumns){
      findFilters(column);
    }
  }

  /**
   * adds all distinct filter values of the filter column to the filters array.
   * @param column is the column to find distinct filters for
   */
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
