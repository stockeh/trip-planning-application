package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

public class Config {
  public int version;
  public String type;
  public int optimization;

  private Config config;

  public Config(Request request) {
    // first print the request
    // System.out.println("Request: " + HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    config = gson.fromJson(requestBody, Config.class);
    config.optimization = 1;

  }

  /** Handles the response for a Trip object.
   * Does the conversion from a Java class to a Json string.*
   * @return Returns a JSON of the trip object.
   */
  public String getConfig() {
    Gson gson = new Gson();
    return gson.toJson(config);
  }
}
