import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {
        information : [false,false,false] // ID, Latitude, Longitude
    };

    this.createTable = this.createTable.bind(this);
    this.buildDestination = this.buildDestination.bind(this);
    this.removeDestinations = this.removeDestinations.bind(this);
    this.showInformation = this.showInformation.bind(this);
  }

  /* Functions to update the state that checkboxes are dependant on
   * Toggles the corresponding state
   */
  showInformation(event) {
    let newInformation = Object.assign({}, this.state.information);
    newInformation[event.target.value] = !newInformation[event.target.value];
    this.setState({information:newInformation},
        function () {
        this.createTable();
      });
  }

  buildDestination(item, index) {
    var destinationName = [item.name];

    if (this.state.information[0]) {
        destinationName.push(<span key={item.id}><br/><small>ID: {item.id}</small></span>);
    }

    if (this.state.information[1]) {
        destinationName.push(<span key={item.latitude}><br/><small>Latitude: {item.latitude}</small></span>);
    }

    if (this.state.information[2]) {
        destinationName.push(<span key={item.longitude}><br/><small>Longitude: {item.longitude}</small></span>);
    }

    if (index !== 0) {
      destinationName.push(<a key={item.name} className="text-info font-weight-light"
                              style={{cursor:'pointer'}}
                              onClick={() => {
                                this.props.updateStartingLocation(index);
                              }}><br/><small> Make Start </small></a>);
    }
    return destinationName;
  }

  /*
  Called when remove all button is pressed.
  Removes places, destinations and clears map.
   */
  removeDestinations() {
      this.props.resetDestinations();
      this.createTable();
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
      for (let i = 0; i < destinations.length; ++i) {
          rows.push(<tr key={i}>{ destinations[i] }{ dists[i] }{ cumulative[i] }</tr>);
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
                        <label><input type="checkbox" value={0} onChange={this.showInformation}/> ID </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" value={1} onChange={this.showInformation}/> Latitude </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" value={2} onChange={this.showInformation}/> Longitude </label>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.props.reverseTrip}/> Reverse Trip </label>
                    </div>
                    <span className="input-group-btn">
                        <button className="btn btn-danger " onClick={() => { if (window.confirm('Clear all destinations?')) this.removeDestinations() }} type="button">Remove All Destinations</button>
                    </span>
                </div>
            </div>
        </div>
    )
  }
}

export default Itinerary;
