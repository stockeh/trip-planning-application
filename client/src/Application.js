import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
import Itinerary from "./Itinerary";

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      trip: { // default TFFI
        type: "trip",
        title: "",
        options : {distance: "", optimization: ""},
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
  }

  updateTrip(tffi){
    console.log("updateTrip");
    console.log("TFFI " + tffi);
    this.setState({trip:tffi});
  }

  updateOptions(opt){
    // update the options in the trip.
    console.log("APPLICATION " + opt);
    var newDistance = Object.assign({}, this.state.trip);
    newDistance.options.distance = opt;
    this.setState({ trip: newDistance});
  }

  updateTitle(t){
    var newTitle = Object.assign({}, this.state.trip),
        title = t;
    //console.log("APPLICATION title " + title);
    newTitle.title = t;
    this.setState({trip: newTitle});
  }

  reverseTrip(){
      var newTrip = Object.assign({}, this.state.trip),
          startingLocation = newTrip.places.shift();
      newTrip.places = newTrip.places.reverse();
      newTrip.places.unshift(startingLocation);
      if(this.state.trip.distances.length)
        newTrip.distances = newTrip.distances.reverse();
      this.setState({trip: newTrip});
  }

  render() {
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
                <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateTitle={this.updateTitle} reverseTrip={this.reverseTrip}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Application;