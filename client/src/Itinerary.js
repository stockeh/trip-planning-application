import React, {Component} from 'react';
import {table_scroll, canyon_btn, canyon_hvr, bg_csu_gold} from './css/styling.css';
import GoTrashcan from 'react-icons/lib/go/trashcan';
import MdRemoveCircleOutline from 'react-icons/lib/md/remove-circle-outline';
import IoIosNavigateOutline from 'react-icons/lib/io/ios-navigate-outline';
import { Button}  from 'reactstrap';
import { remove_logo, add_logo} from './css/styling.css';


class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {
            ID        : false,
            Latitude  : false,
            Longitude : false
    };

    this.createTable = this.createTable.bind(this);
    this.buildDestination = this.buildDestination.bind(this);
    this.showInformation = this.showInformation.bind(this);
    this.addInformation = this.addInformation.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.placeInformation = this.placeInformation.bind(this);
  }

  /* Function to update the state that checkboxes are dependant on.
   * Toggles the corresponding state.
   */
  showInformation(event) {
    let str = "this.state." + event.target.id;
    this.setState({[event.target.id]:!eval(str)});
  }

  addInformation(destinationName, item, k) {
      let str = "item." + k.toLowerCase();
      destinationName.push(<span key={eval(str)}><br/><small>{k}: {eval(str)}</small></span>);
      return destinationName;
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

  buildDestination(item, index) {
    let destinationName = [item.name];
    let information = this.placeInformation(item);
    destinationName.push(<small key={index}><br/>{information.regionName}{information.countryName}</small>);
    const keys = ['ID', 'Latitude', 'Longitude'];
    for (let k of keys) {
      if (this.state[k])
        destinationName = this.addInformation(destinationName, item, k);
    }

    if (index !== 0) {
        destinationName.push(<a key={item.name} className={"text-info font-weight-light"}
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    this.props.updateStartingLocation(index);
                                }}><br/>
            <small><IoIosNavigateOutline className="add_logo" size={25}/></small>
            </a>);
    }else if(index == 0){destinationName.push(<br/>);}
    destinationName.push(<a key={item} className="font-weight-light text-danger"
                            style={{cursor:'pointer'}}
                            onClick={ () => {
                                this.props.removedPlan(index);
                            }}><small><MdRemoveCircleOutline className = "remove_logo" size={25}/></small></a>);
    return destinationName;
  }

  /*
   * Logic to find what units to display and use
   */
  getUnits() {
      let units;

      if (this.props.trip.options.userUnit !== "" && this.props.trip.options.distance === "user defined") { // custom units given
          console.log("USERUNIT: " + this.props.trip.options.userUnit);
          units = this.props.trip.options.userUnit;
      } else {
          units = (this.props.trip.options.distance) ? this.props.trip.options.distance : "miles";
      }

      return units;
  }
  /*
   * Logic to populate the itinerary table with corresponding data
   */
  createTable () {
    let distance = this.props.trip.distances.reduce(function(a, b) { return a + b; }, 0);
    let units = this.getUnits();

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

  renderCheckbox(label) {
    return <div className="checkbox">
        <label><input type="checkbox" id={label} onChange={this.showInformation}/> {label} </label>
    </div>;
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary" className="container">
            <div className="row">
                <div className="col-xs-12 col-md-8 col-lg-6 col-xl-5 order-last order-md-first">
                    <h4>Round trip distance: {table.distance} <b>{table.units}</b>. </h4>
                    <table className="table_scroll table table-responsive table-hover">
                        <thead>
                        <tr>
                            <th className="bg_csu_gold align-middle" scope="col">Destinations</th>
                            <th className="bg_csu_gold align-middle" scope="col">Leg Distance</th>
                            <th className="bg_csu_gold align-middle" scope="col">Total<br/>Distance</th>
                        </tr>
                        </thead>
                        <tbody>{table.rows}</tbody>
                    </table>
                </div>
                <div className="col-xs-12 col-md-4 order-first order-md-last">
                    <h5>Display Options</h5>
                    {this.renderCheckbox("ID")}
                    {this.renderCheckbox("Latitude")}
                    {this.renderCheckbox("Longitude")}
                    <div className="checkbox">
                        <label><input type="checkbox" onChange={this.props.reverseTrip}/> Reverse Trip </label>
                    </div>
                    <span className="input-group-btn">
                        <Button className="canyon_btn canyon_hvr" onClick={() => { if (window.confirm('Clear all destinations?')) this.props.resetDestinations() }}><GoTrashcan size={20}/>  Remove All Destinations</Button>
                    </span>
                </div>
            </div>
        </div>
    )
  }
}

export default Itinerary;
