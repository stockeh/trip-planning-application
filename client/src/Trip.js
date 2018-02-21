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

    this.state = {
        reverse:    false
    };

    this.plan = this.plan.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
    this.updateT = this.updateT.bind(this);
    this.reverse = this.reverse.bind(this);
  }

  reverse(){
      this.setState({reverse: true},
          function() {
            this.plan();
          });
      console.log("HELLLOOOO" + this.state.reverse);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    // need to get the request body from the trip in state object.
    var places = (this.state.reverse == true) ? this.props.trip.places.reverse() : this.props.trip.places;
    console.log("HELLLOOOO" + this.state.reverse);
    let requestBody = {
        "type"    : this.props.trip.type,
        "title"   : this.props.trip.title,
        "options" : { 
          "distance": this.props.trip.options.distance,
          "optimization":"none"
        },
        "places"  : places,
        "map"     : this.props.trip.map
      };

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
      let saveBody = {
          "type"    : this.props.trip.type,
          "title"   : this.props.trip.title,
          "options" : {
              "distance": this.props.trip.options.distance,
              "optimization":"none"
          },
          "places"      : this.props.trip.places,
          "distances"   : this.props.trip.distances,
          "map"         : this.props.trip.map
      };

      var fileName = this.props.trip.title;
      if (fileName == "")
          fileName = "Trip.json";
      else
          fileName += ".json";


      var blob = new Blob ([JSON.stringify(saveBody)], { type: 'text/plain' }),
          anchor = document.createElement('a');

      anchor.download = fileName;
      anchor.href = (window.URL).createObjectURL (blob);
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join (':');
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
              <button className="btn btn-primary " onClick={this.reverse} type="button">Reverse</button>
              </span>
              <input id="trip-title" type="text" className="form-control trip-title" onChange={this.updateT} value={this.props.trip.title} placeholder="Trip title..."/>
              <span className="input-group-btn">
              <button className="btn btn-primary " onClick={this.saveTFFI} type="button">Save</button>
            </span>
            </div>
            <Map trip={this.props.trip} />
            <Itinerary trip={this.props.trip} />
          </div>
        </div>
    )
  }
}

export default Trip;