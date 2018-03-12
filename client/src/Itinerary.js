import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {
        updateID:   false,
        updateLat:  false,
        updateLong: false
    };

    this.createTable = this.createTable.bind(this);
    this.updateID = this.updateID.bind(this);
    this.updateLatitude = this.updateLatitude.bind(this);
    this.updateLongitude = this.updateLongitude.bind(this);
    this.reverse = this.reverse.bind(this);
    this.buildDestination = this.buildDestination.bind(this);
  }
  reverse(){
    this.props.reverseTrip();
  }

  /*
  Functions to update the state that checkboxes are dependant on
  Toggles the corresponding state
   */
  updateID () {
      this.setState({updateID: !this.state.updateID},
          function () {
            this.createTable();
          });
  }

  updateLatitude () {
      this.setState({updateLat: !this.state.updateLat},
          function () {
              this.createTable();
          });
  }

  updateLongitude () {
      this.setState({updateLong: !this.state.updateLong},
          function () {
              this.createTable();
          });
  }

  buildDestination(item, index) {
    var destinationName = [item.name];

    if (this.state.updateID) {
        destinationName.push(<span><br/><small>ID: {item.id}</small></span>);
    }

    if (this.state.updateLat) {
        destinationName.push(<span><br/><small>Latitude: {item.latitude}</small></span>);
    }

    if (this.state.updateLong) {
        destinationName.push(<span><br/><small>Longitude: {item.longitude}</small></span>);
    }

    if (index !== 0) {
      destinationName.push(<a className="text-info font-weight-light"
                              style={{cursor:'pointer'}}
                              onClick={() => {
                                this.props.updateStartingLocation(index);
                              }}><br/><small> Make Start </small></a>);
    }
    return destinationName;
  }

  /*
 Logic to populate the itinerary table with corresponding data
  */
  createTable () {
    let distance = this.props.trip.distances.reduce(function(a, b) { return a + b; }, 0);
    let units = (this.props.trip.options.distance) ? this.props.trip.options.distance : "miles";

    let destinations = this.props.trip.places.map((item, index) => <td>{this.buildDestination(item, index)}</td>);
    if (destinations.length > 1) // There is a round trip.
        destinations.push(<td>{"Return to " + this.props.trip.places[0].name}</td>);

    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    let cumul = 0;
    let cumulative = this.props.trip.distances.map((item) => <td>{ cumul += item }</td>);

    if (this.props.trip.distances.length > 0) { // Append a leading '0' for trip distances.
      dists.unshift(<td>{"0"}</td>);
      cumulative.unshift(<td>{"0"}</td>);
    }

    let rows = [];
      for (var i = 0; i < destinations.length; ++i) {
          rows.push(<tr>{ destinations[i] }{ dists[i] }{ cumulative[i] }</tr>);
      }

    return {distance, units, rows};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary" className="container">
            <div className="row">
                <div className="col-xs-12 col-md-8 order-last order-md-first">
                    <h4>Round trip distance of {table.distance} <b>{table.units}</b>. </h4>
                    <table className="table table-responsive table-hover">
                        <thead>
                        <tr>
                            <th className="table-info align-middle" scope="col">Destinations</th>
                            <th className="table-info align-middle" scope="col">Leg Distance</th>
                            <th className="table-info align-middle" scope="col">Cumulative<br/>Distance</th>
                        </tr>
                        </thead>
                        <tbody>
                            {table.rows}
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-12 col-md-4 order-first order-md-last">
                    <h5>Choose to change in the itinerary!</h5>
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.updateID}/> ID </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.updateLatitude}/> Latitude </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.updateLongitude}/> Longitude </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.reverse}/> Reverse Trip </label>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Itinerary;
