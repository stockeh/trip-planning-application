package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

public class Query {
  private Search search;


  /** Handles search request, creating a new query object from the search request.
   * Does the conversion from Json to a Java class before searching.
   * @param request request from the server, .println(HTTP.echoRequest(request));
   */
  public Query(Request request){
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    search = gson.fromJson(requestBody, Search.class);

    // search the database
    search.find();
  }

  /** Handles the response for a Search object.
   * Does the conversion from a Java class to a Json string.*
   * @return Returns a JSON of the search object.
   */
  public String getSearch() {
    Gson gson = new Gson();
    return gson.toJson(search);
  }
}
