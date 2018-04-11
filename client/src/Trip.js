import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';
import GMap from './GMap';
import { Button } from 'reactstrap';
import { green_btn, green_hvr, green_logo, green_hvr_logo, bg_csu_green } from './css/styling.css';
import IoIosDownloadOutline from 'react-icons/lib/io/ios-download-outline';
import ReactTooltip from 'react-tooltip'

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
      super(props);

      this.distance = "miles";

      this.state = {
          initialPlan : false
      };

      this.plan = this.plan.bind(this);
      this.saveTFFI = this.saveTFFI.bind(this);
      this.updateT = this.updateT.bind(this);
      this.removedPlan = this.removedPlan.bind(this);
      this.checkDistance = this.checkDistance.bind(this);
      this.initialPlan = this.initialPlan.bind(this);
      this.getMap = this.getMap.bind(this);
      this.planAndSave = this.planAndSave.bind(this);
  }

  removedPlan(index) {
    let body = Object.assign({}, this.props.trip);
    body.places.splice(index, 1);
    if (body.distances.length !== 0) {
      body.distances.splice(index,1);
      this.plan(body);
    }
    else {
      this.props.updateTrip(body);
    }
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(body){
    // need to get the request body from the trip in state object.
    let requestBody = body;

    console.log(process.env.SERVICE_URL);
    console.log(requestBody);

    return fetch('http://' + location.host + '/plan', {
    method:"POST",
    body: JSON.stringify(requestBody)
    });
  }

  async plan(body){
    try {
      let serverResponse = await this.fetchResponse(body);
      let tffi = await serverResponse.json();
      // console.log("RESPONSE: " + JSON.stringify(tffi));
      this.props.updateTrip(tffi);
    } catch(err) {
      console.error(err);
    }
  }

  updateT(event){
      this.props.updateInformation(event.target.value, "title");
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI(){
      console.log("SaveTFFI");
      console.log("Version: " + this.props.trip.version);
      let saveBody = this.props.trip;

      /* if version 1, remove new version data to save*/
      if (this.props.trip.version === 1) {
          console.log("Deleting data for V1");
          delete saveBody.version;  // version 1 doesn't contain version attribute
          delete saveBody.options.userUnit;
          delete saveBody.options.userRadius;
      }

      var fileName = this.props.trip.title;
      if (fileName === "")
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

  checkDistance() {
      let b_distance = this.props.trip.options.distance;
      if (b_distance !== this.distance && (b_distance !== "" || b_distance !== "user defined")) {
          this.distance = this.props.trip.options.distance;
          if (this.state.initialPlan)
            this.plan(this.props.trip);
      }
  }

  initialPlan() {
      this.setState({initialPlan: true});
  }

  getMap() {
      let map;
      if (this.props.config.version < 9) { // set to 9 for testing purposes
          map = <Map trip={this.props.trip} config={this.props.config}/>;
      } else {
          map = <GMap trip={this.props.trip} config={this.props.config}/>;
      }
      return map;
  }

  planAndSave() {
    return(
      <div className="input-group" role="group">
              <span className="input-group-btn">
              <Button className="green_btn green_hvr" onClick={ () => {this.plan(this.props.trip);
                  this.initialPlan()}}>Plan</Button>
              </span>
        <input id="trip-title" type="text" className="form-control trip-title"
               onChange={this.updateT} value={this.props.trip.title} placeholder="Trip title..."/>
        <span className="input-group-btn">
              <Button className="green_logo green_hvr_logo">
                <IoIosDownloadOutline size={38} onClick={this.saveTFFI}/>
              </Button>
            </span>
      </div>
    );
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    this.checkDistance();
    return(
        <div id="trip" className="card">
          <div className="card-header bg_csu_green text-white">
            Trip
          </div>
          <div className="card-body">
            <p>Give your trip a title before planning or saving.</p>
            {this.planAndSave()}
            {this.getMap()}
            <Itinerary trip={this.props.trip} placeInformation={this.props.placeInformation}
                       removedPlan={this.removedPlan} reverseTrip={this.props.reverseTrip}
                       updateStartingLocation={this.props.updateStartingLocation}
                       resetDestinations={this.props.resetDestinations}/>
          </div>
        </div>
    )
  }
}

export default Trip;