import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    console.log("APPLICATION: " + this.props.config.optimization);
    this.state = {
      trip: { // default TFFI
        version: 2,
        type: "trip",
        title: "",
        options: {
          distance: "miles",
          userUnit: "",
          userRadius: "",
          optimization: "0.0"},
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateStartingLocation = this.updateStartingLocation.bind(this);

    this.reverseTrip = this.reverseTrip.bind(this);
    this.resetDestinations = this.resetDestinations.bind(this);

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

  render() {

    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
                <Options config={this.props.config} trip={this.state.trip} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-xs-12 col-md-6">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip} updatePlaces={this.updatePlaces}
                              updateInformation={this.updateInformation}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateInformation={this.updateInformation}
                      reverseTrip={this.reverseTrip} updateStartingLocation={this.updateStartingLocation}
                      resetDestinations={this.resetDestinations}/>
            </div>
          </div>
        </div>
    )
  }
}



export default Application;