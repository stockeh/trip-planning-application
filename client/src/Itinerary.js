import React, {Component} from 'react';
import Options from './Options';
import {table_scroll, canyon_btn, canyon_hvr, bg_csu_gold} from './css/styling.css';
import GoTrashcan from 'react-icons/lib/go/trashcan';
import MdRemoveCircleOutline from 'react-icons/lib/md/remove-circle-outline';
import IoIosNavigateOutline from 'react-icons/lib/io/ios-navigate-outline';
import { Button}  from 'reactstrap';
import { remove_logo, add_logo} from './css/styling.css';
import './css/itinerary.css';
import ReactTooltip from 'react-tooltip'


class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {
            ID        : false,
            Latitude  : false,
            Longitude : false,
            Advanced  : false
    };

    this.createTable = this.createTable.bind(this);
    this.buildDestination = this.buildDestination.bind(this);
    this.showInformation = this.showInformation.bind(this);
    this.addInformation = this.addInformation.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.advancedOptions = this.advancedOptions.bind(this);
    this.optionsButton = this.optionsButton.bind(this);
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

  buildDestination(item, index) {
    let destinationName = [item.name];
    let information = this.props.placeInformation(item);
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
            <small><IoIosNavigateOutline className="add_logo" size={25} data-tip="Set As Start" data-for="start"/></small><ReactTooltip id="start" place="bottom" effect="solid"/>
            </a>);
    }else if(index === 0){destinationName.push(<br/>);}
    destinationName.push(<a key={item} className="font-weight-light text-danger"
                            style={{cursor:'pointer'}}
                            onClick={ () => {
                                this.props.removedPlan(index);
                            }}><small><MdRemoveCircleOutline className = "remove_logo" size={25} data-tip="Remove" data-for="remove"/></small><ReactTooltip id="remove" place="right" effect="solid"/></a>);
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
    console.log("Creating Table");
    let distance = this.props.trip.distances.reduce(function(a, b) { return a + b; }, 0);
    let units = this.getUnits();

    let destinations = this.props.trip.places.map((item, index) => <td>{this.buildDestination(item, index)}</td>);
    if (destinations.length > 1) // There is a round trip.
        destinations.push(<td>{this.props.trip.places[0].name}</td>);

    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    let cumul = 0;
    let cumulative = this.props.trip.distances.map((item) => <td>{ cumul += item }</td>);

    if (this.props.trip.distances.length > 0) { // Append a leading '0' for trip distances.
      dists.unshift(<td>{"0"}</td>);
      cumulative.unshift(<td>{"0"}</td>);
    }

    let rows = [];
      for (let i = 0; i < destinations.length-1; ++i) {
          rows.push(<tr key={i}>{ destinations[i] }{destinations[i+1]}{ dists[i] }{ cumulative[i] }</tr>);
      }

    return {distance, units, rows};
  }

  renderCheckbox(label) {
    return <div className="checkbox">
        <label><input type="checkbox" id={label} onChange={this.showInformation}/> {label} </label>
    </div>;
  }

  advancedOptions() {
    return(
      <div>
        <div className="col-12">
          <Options config={this.props.config} trip={this.props.trip} updateOptions={this.props.updateOptions}
                   updateOptionsUnits={this.props.updateOptionsUnits} updateHost={this.props.updateHost}/>
        </div>
        <br/>
        <div className="col-12">
          <h6 className="larger-CSUtext-uncap">Display Options</h6>
        </div>
        <div className="col-6">
          {this.renderCheckbox("ID")}
          {this.renderCheckbox("Latitude")}
        </div>
        <div className="col-6">
          {this.renderCheckbox("Longitude")}
          <div className="checkbox">
            <label><input type="checkbox" onChange={this.props.reverseTrip}/> Reverse Trip </label>
          </div>
        </div>
      </div>
    )
  }

  optionsButton() {
    const setAdvanced = () => {
      this.setState({Advanced: !this.state.Advanced});
    };
    return(
      <div>
        <Button className="btn btn-light btn-md larger-CSUtext-uncap"
              onClick={setAdvanced}>Advanced Options
        </Button>
      </div>
    )
  }


  render() {
    const visible = {
      'display': this.state.Advanced ? 'block' : 'none'
    };
    let table = this.createTable();
    return(
        <div id="itinerary" className="container">
          {this.optionsButton()}
          <hr/>
          <div className="row">
            <div className="col-12" id="filter-content" style={visible}>
              {this.advancedOptions()}
              <hr/>
            </div>
            <div className="col-12">
              <span className="input-group-btn">
                  <Button className="canyon_btn canyon_hvr" onClick={() => { if (window.confirm('Clear all destinations?')) this.props.resetDestinations() }}><GoTrashcan size={20}/>  Remove All Destinations</Button>
              </span>
              <h4>Round trip distance: {table.distance} <b>{table.units}</b>. </h4>
              <table className="table_scroll table table-responsive">
                  <thead>
                  <tr>
                      <th className="bg_csu_gold align-middle" scope="col">From</th>
                      <th className="bg_csu_gold align-middle" scope="col">To</th>
                      <th className="bg_csu_gold align-middle" scope="col">Leg Distance</th>
                      <th className="bg_csu_gold align-middle" scope="col">Total<br/>Distance</th>
                  </tr>
                  </thead>
                  <tbody>{table.rows}</tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}

export default Itinerary;
