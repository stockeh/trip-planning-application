import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
import { Button}  from 'reactstrap';
import { green_btn, green_hvr, green_logo, green_hvr_logo, bg_csu_green } from './css/styling.css';
import IoChevronRight from 'react-icons/lib/io/chevron-right';
import Menu from "./Menu";

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: { // default TFFI
        version: 3,
        type: "trip",
        title: "",
        options: {
          distance: "miles",
          userUnit: "",
          userRadius: "",
          optimization: "0.0",
          map: "svg" },
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateOptionsUnits = this.updateOptionsUnits.bind(this);
    this.updateStartingLocation = this.updateStartingLocation.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.resetDestinations = this.resetDestinations.bind(this);
    this.placeInformation = this.placeInformation.bind(this);
    this.menu = this.menu.bind(this);
  }

  updateTrip(tffi){
    console.log("updateTrip");
    console.log("TFFI " + tffi);
    this.setState({trip:tffi});
  }

  updateInformation(data, obj) {
    let newTrip = Object.assign({}, this.state.trip);
    newTrip[obj] = data;
    this.setState({trip: newTrip});
  }

  updatePlaces(place) {
    let newTrip = Object.assign({}, this.state.trip);
    newTrip.places.push(place);
    this.setState({trip : newTrip});
    console.log(this.state.trip.places);
  }

  updateOptions(opt){
    // update the options in the trip.
    let newDistance = Object.assign({}, this.state.trip);
    if(!isNaN(parseFloat(opt))){
      newDistance.options.optimization=opt;
    }else {
      newDistance.options.distance = opt;
    }

    // let newDistance = Object.assign({}, this.state.trip);
    // newDistance.options.distance = opt;
    this.setState({ trip: newDistance});
    console.log(this.state);
  }

  updateOptionsUnits(option, value) {
    let newUnit = Object.assign({}, this.state.trip);
    if (option === "userUnit") {
        newUnit.options.userUnit = value;
    } else if (option === "userRadius") {
        newUnit.options.userRadius = value;
    }

    this.setState({ trip: newUnit });
    console.log("UPDATED user units: " + JSON.stringify(this.state));
  }

  updateStartingLocation(startingIndex) {
    let newTrip = Object.assign({}, this.state.trip);

    for (let i = 0; i < startingIndex; ++i) {
      let first = newTrip.places.shift();
      newTrip.places.push(first);
      if(newTrip.distances.length !== 0) {
        let first = newTrip.distances.shift();
        newTrip.distances.push(first);
      }
    }

    this.setState({trip: newTrip});
  }


  placeInformation(item) {
    let countryName = null;
    let regionName = null;
    if("country" in item){
      if(item.country !== undefined && item.country !== "NULL"
        && item.country !== "" && item.country !== "(unassigned)"){countryName = item.country}
    }
    if("region" in item){
      if(item.region !== undefined && item.region !== "NULL"
        && item.region !== "" && item.region !== "(unassigned)"){
        regionName = item.region;
        if(countryName !== null){regionName += ", ";}
      }
    }
    return {regionName, countryName}
  }

  reverseTrip(){
    if (this.state.trip.places.length) {
      let newTrip = Object.assign({}, this.state.trip),
        startingLocation = newTrip.places.shift();
      newTrip.places = newTrip.places.reverse();
      newTrip.places.unshift(startingLocation);
      if (this.state.trip.distances.length)
        newTrip.distances = newTrip.distances.reverse();
      this.setState({trip: newTrip});
    }
  }

  resetDestinations() {
      let newTrip = Object.assign({}, this.state.trip);
      newTrip.places = [];
      newTrip.distances = [];
      newTrip.map = "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>";
      this.setState({trip: newTrip});
  }

  menu() {
      document.getElementById("side-menu").style.display = "block";
  }

  render() {
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
                <Options config={this.props.config} trip={this.state.trip} updateOptions={this.updateOptions}
                         updateOptionsUnits={this.updateOptionsUnits}/>
            </div>
            <div className="col-xs-12 col-md-6">
                <Destinations trip={this.state.trip} config={this.props.config} updateTrip={this.updateTrip}
                              updatePlaces={this.updatePlaces}
                              updateInformation={this.updateInformation} placeInformation={this.placeInformation}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateInformation={this.updateInformation}
                      reverseTrip={this.reverseTrip} updateStartingLocation={this.updateStartingLocation}
                      resetDestinations={this.resetDestinations} placeInformation={this.placeInformation}
                      config={this.props.config}/>
            </div>
              <Button id="side-menu-button">
                  <IoChevronRight size={40} onClick={this.menu}/>
              </Button>
            <Menu trip={this.state.trip} updateTrip={this.updateTrip} updateInformation={this.updateInformation}
                  reverseTrip={this.reverseTrip} updateStartingLocation={this.updateStartingLocation}
                  resetDestinations={this.resetDestinations} placeInformation={this.placeInformation}
                  config={this.props.config}/>
          </div>
        </div>
    )
  }
}



export default Application;