package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t10.server.HTTP;
import spark.Request;

import java.util.ArrayList;

/**
 * This class handles to the conversions of the trip request/resopnse,
 * converting from the Json string in the request body to a Trip object,
 * planning the Trip, and
 * converting the resulting Trip object back to a Json string
 * so it may returned as the response.
 */
public class Plan {

  private Trip trip;

  /** Handles trip planning request, creating a new trip object from the trip request.
   * Does the conversion from Json to a Java class before planning the trip.
   * @param request request from the server, .println(HTTP.echoRequest(request));
   */
  public Plan(Request request) {
    // first print the request
    // System.out.println("Request: " + HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    trip = gson.fromJson(requestBody, Trip.class);

    // plan the trip.
    trip.plan();

  }

  /** Handles the response for a Trip object.
   * Does the conversion from a Java class to a Json string.*
   * @return Returns a JSON of the trip object.
   */
  public String getTrip() {
    Gson gson = new Gson();
    return gson.toJson(trip);
  }
}
