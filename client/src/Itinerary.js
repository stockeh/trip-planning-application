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
  }

  updateID () {
      this.setState({updateID: !this.state.updateID});
  }

  updateLatitude () {
      this.setState({updateLat: !this.state.updateLat});
  }

  updateLongitude () {
      this.setState({updateLong: !this.state.updateLong});
  }

  createTable () {
    let distance = this.props.trip.distances.reduce(function(a, b) { return a + b; }, 0);
    let units = this.props.trip.options.distance;
    if (units != "miles" && units != "kilometers") // Default to miles
      units = "miles";
    let dests = this.props.trip.places.map((item) => <td>{item.name}</td>);
    if (this.props.trip.places.length > 1) // There is a round trip.
      dests.push(<td>{ "Return to " + this.props.trip.places[0].name }</td>);
    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    var cumul = 0;
    let cumulative = this.props.trip.distances.map((item) => <td>{ cumul += item }</td>);

    if (this.props.trip.distances.length > 0) { // Append a leading '0' for trip distances.
      dists.unshift(<td>{"0"}</td>);
      cumulative.unshift(<td>{"0"}</td>);
    }

    let rows = [];
      for (var i = 0; i < dests.length; ++i) {
          rows.push(<tr>{ dests[i] }{ dists[i] }{ cumulative[i] }</tr>);
      }

    // console.log(this.props.trip);

    return {distance, units, rows};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
            <h4>Round trip distance of {table.distance} <b>{table.units}</b>. </h4>
          <table className="table table-responsive table-bordered table-hover">
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
    )
  }
}

export default Itinerary;
