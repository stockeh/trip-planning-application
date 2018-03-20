import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
      super(props);

      this.plan = this.plan.bind(this);
      this.saveTFFI = this.saveTFFI.bind(this);
      this.updateT = this.updateT.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    // need to get the request body from the trip in state object.
    let requestBody = this.props.trip;

    console.log(process.env.SERVICE_URL);
    console.log(requestBody);

      return fetch('http://' + location.host + '/plan', {
      method:"POST",
      body: JSON.stringify(requestBody)
    });
  }

  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateTrip(tffi);
    } catch(err) {
      console.error(err);
    }
  }

  updateT(event){
      this.props.updateTitle(event.target.value);
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI(){
      console.log("SaveTFFI");
      console.log("Version: " + this.props.trip.version);
      let saveBody = this.props.trip;

      /* if version 1, remove new version data to save*/
      if (this.props.trip.version == 1) {
          console.log("Deleting data for V1");
          delete saveBody.version;  // version 1 doesn't contain version attribute
          delete saveBody.options.userUnit;
          delete saveBody.options.userRadius;g
      }

      var fileName = this.props.trip.title;
      if (fileName == "")
          fileName = "Trip.json";
      else
          fileName += ".json";


      var blob = new Blob ([JSON.stringify(saveBody)], { type: 'application/json' }),
          anchor = document.createElement('a');

      anchor.download = fileName;
      anchor.href = (window.URL).createObjectURL (blob);
      anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join (':');
      anchor.click();
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
        <div id="trip" className="card">
          <div className="card-header bg-info text-white">
            Trip
          </div>
          <div className="card-body">
            <p>Give your trip a title before planning or saving.</p>
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary " onClick={this.plan} type="button">Plan</button>
              </span>
              <input id="trip-title" type="text" className="form-control trip-title" onChange={this.updateT} value={this.props.trip.title} placeholder="Trip title..."/>
              <span className="input-group-btn">
              <button className="btn btn-primary " onClick={this.saveTFFI} type="button">Save</button>
            </span>
            </div>
            <Map trip={this.props.trip} />
            <Itinerary trip={this.props.trip} reverseTrip={this.props.reverseTrip} updateStartingLocation={this.props.updateStartingLocation} resetDestinations={this.props.resetDestinations}/>
          </div>
        </div>
    )
  }
}

export default Trip;