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
        version: 0,
        type: "",
        title: "",
        options : {distance: "", optimization:0},
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.updateStartingLocation = this.updateStartingLocation.bind(this);
  }



  updateTrip(tffi){
    console.log("updateTrip");
    console.log("TFFI " + tffi);
    this.setState({trip:tffi});
  }

  // tripVersionHandling(){
  //   if(this.trip.version === 1){
  //     this.trip.options.optimization="none"
  //   }else if(isNaN(this.trip.options.optimization)){
  //     this.trip.options.optimization = 0;
  //   }
  // }


  updateOptions(opt){
    // update the options in the trip.
    console.log("APPLICATION " + opt);
    let newDistance = Object.assign({}, this.state.trip);
    if(Number.isInteger(parseInt(opt))){
      newDistance.options.optimization=parseInt(opt);
    }else {
      newDistance.options.distance = opt;
    }

    // let newDistance = Object.assign({}, this.state.trip);
    // newDistance.options.distance = opt;
    this.setState({ trip: newDistance});
    console.log(this.state);
  }

  updateTitle(t){
    let newTitle = Object.assign({}, this.state.trip);
    newTitle.title = t;
    this.setState({trip: newTitle});
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

  render() {
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
                <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-xs-12 col-md-6">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateTitle={this.updateTitle}
                      reverseTrip={this.reverseTrip} updateStartingLocation={this.updateStartingLocation}/>
            </div>
          </div>
        </div>
    )
  }
}



export default Application;