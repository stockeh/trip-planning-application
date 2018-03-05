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
        options : {distance: ""},
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

  updateOptions(opt){
    // update the options in the trip.
    let newDistance = Object.assign({}, this.state.trip);
    newDistance.options.distance = opt;
    this.setState({ trip: newDistance});
  }

  updateTitle(t){
    let newTitle = Object.assign({}, this.state.trip);
    newTitle.title = t;
    this.setState({trip: newTitle});
  }

  reverseTrip(){
      let newTrip = Object.assign({}, this.state.trip),
          startingLocation = newTrip.places.shift();
      newTrip.places = newTrip.places.reverse();
      newTrip.places.unshift(startingLocation);
      if(this.state.trip.distances.length)
        newTrip.distances = newTrip.distances.reverse();
      this.setState({trip: newTrip});
  }

  updateStartingLocation(startingIndex) {
    /*This function swaps numElements starting at index first
    with numElements starting at index second */
    function swap(arr, first, second, numElements) {
      let index, temp;
      for (index = 0; index < numElements; ++index) {
        temp = arr[first + index];
        arr[first + index] = arr[second + index];
        arr[second + index] = temp;
      }
    }
    let newTrip = Object.assign({}, this.state.trip);
    let distances = newTrip.distances;

    let start = startingIndex,
        diff = newTrip.places.length - start;
    while (start !== diff) {
      if(start < diff) { /*A is shorter*/
        if (distances.length)
          swap(newTrip.distances, startingIndex-start, startingIndex+diff-start, start);
        swap(newTrip.places, startingIndex-start, startingIndex+diff-start, start);
        diff -= start;
      }
      else { /*B is shorter*/
        if (distances.length)
          swap(newTrip.distances, startingIndex-start, startingIndex, diff);
        swap(newTrip.places, startingIndex-start, startingIndex, diff);
        start -= diff;
      }
    }
    /*Finally, block swap A and B*/
    if (distances.length)
      swap(newTrip.distances, startingIndex-start, startingIndex, start);
    swap(newTrip.places, startingIndex-start, startingIndex, start);

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
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateTitle={this.updateTitle}
                      reverseTrip={this.reverseTrip} updateStartingLocation={this.updateStartingLocation}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Application;