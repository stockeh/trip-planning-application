import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';
import Destinations from './Destinations';
import Query from './Query';
import GMap from './GMap';
import {Button, ButtonGroup} from 'reactstrap';
import ReactTooltip from 'react-tooltip'
import IoChevronRight from 'react-icons/lib/io/chevron-right';
import IoIosDownloadOutline from 'react-icons/lib/io/ios-download-outline';
import './css/w3.css';
import './css/menu.css';

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
          initialPlan : false,
          displayMenu: false
      };

      this.plan = this.plan.bind(this);
      this.saveTFFI = this.saveTFFI.bind(this);
      this.updateT = this.updateT.bind(this);
      this.removedPlan = this.removedPlan.bind(this);
      this.checkDistance = this.checkDistance.bind(this);
      this.initialPlan = this.initialPlan.bind(this);
      this.getMap = this.getMap.bind(this);
      this.planAndSave = this.planAndSave.bind(this);

      this.modal = this.modal.bind(this);
      // this.menuItems = this.menuItems.bind(this);
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
      console.log("RESPONSE: \n"
          + JSON.stringify(tffi, null, 2));
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
    let googleMap = (<GMap trip={this.props.trip} config={this.props.config}/>);
    if (this.props.trip.options.map === undefined) {
      return googleMap;
    }
    else if (this.props.trip.options.map === "svg") {
      return (<div className="container"> <Map trip={this.props.trip} config={this.props.config}/></div>);
    } else {
      return googleMap;
    }

  }

  planAndSave() {
    return(
      <div id="flex-container" className="flex-wrap-container" >
        <div className="static-item">
              <Query trip={this.props.trip} config={this.props.config} updatePlaces={this.props.updatePlaces}
                     placeInformation={this.props.placeInformation}/>
        </div>
        <div className="static-item">
          <Button className="green_btn green_hvr" onClick={ () => {this.plan(this.props.trip); this.initialPlan()}}>Plan</Button>
        </div>
        <div className="flex-item">
          <input id="trip-title" type="text" className="form-control trip-title"
                 onChange={this.updateT} value={this.props.trip.title} placeholder="Trip title..."/>
        </div>
        <div className="static-item">
          <ButtonGroup>
            <Destinations trip={this.props.trip} updateTrip={this.props.updateTrip} updateInformation={this.props.updateInformation}/>
            <label><IoIosDownloadOutline className="green_logo green_hvr_logo" size={38}
                                         onClick={this.saveTFFI} data-for="save" data-tip="Save"/></label>
            <ReactTooltip id="save" place="bottom" effect="solid"/>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  modal(){
    return(
      <div className="modal left fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog left-modal-dialog" role="document">
          <div className="modal-content left-modal-content">

            <div className="modal-header">
              <h5 className="modal-title larger-CSUtext">Menu</h5>
              <button type="button" className="close mb-3" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
            </div>

            <div className="modal-body">
              {/*<Options config={this.props.config} trip={this.props.trip} updateOptions={this.props.updateOptions}*/}
                       {/*updateOptionsUnits={this.props.updateOptionsUnits}/>*/}
              <Itinerary trip={this.props.trip} placeInformation={this.props.placeInformation}
                       removedPlan={this.removedPlan} reverseTrip={this.props.reverseTrip}
                       updateStartingLocation={this.props.updateStartingLocation}
                       resetDestinations={this.props.resetDestinations}
                       updateOptionsUnits={this.props.updateOptionsUnits}
                       config={this.props.config} updateOptions={this.props.updateOptions}/>
            </div>

          </div>
        </div>
      </div>
    )
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    this.checkDistance();
    const count = this.props.trip.places.length; // need to count the number in the trip
    return(
      <div className="m-4">
        <div id="flex-container">
          <div className="static-item">
            <Button className="" id="menu-btn" data-toggle="modal" data-target="#myModal">
              <IoChevronRight size={25}/></Button>
          </div>
          <div className="flex-item" style={{marginLeft: 30}}>
            {this.planAndSave()}
          </div>
        </div>
        <h6 style={{marginLeft: 78}}>There are {count} destinations. </h6>
        {this.modal()}
        {this.getMap()}
      </div>
    )
  }
}

export default Trip;