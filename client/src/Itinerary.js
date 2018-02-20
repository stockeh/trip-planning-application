import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  createTable () {
    let distance = this.props.trip.distances.reduce(function(a, b) { return a + b; }, 0);
    let units = this.props.trip.options.distance;
    if (units != "miles" && units != "kilometers") //Default to miles
      units = "miles";
    let dests = this.props.trip.places.map((item) => <td>{item.name}</td>);
    if (this.props.trip.places.length > 1) // There is a round trip.
      dests.push(<td>{ "Return to " + this.props.trip.places[0].name }</td>);

    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    var cumul = 0;
    let cumulative = this.props.trip.distances.map((item) => <td>{ cumul += item }</td>);

    console.log(this.props.trip);

    return {distance, units, dests, dists, cumulative};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
            <h4>Round trip distance of {table.distance} <b>{table.units}</b>. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle">Destination</th>
              {table.dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-info align-middle">Individual</th>
              {table.dists}
            </tr>
            <tr>
                <th className="table-info align-middle">Cumulative</th>
                {table.cumulative}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;
