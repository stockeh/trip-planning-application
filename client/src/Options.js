import React, {Component} from 'react';
import {ButtonGroup, Button, Container} from 'reactstrap'
import ReactTooltip from 'react-tooltip'
import './css/styling.css';
import IoAndroidDone from 'react-icons/lib/io/android-done';
import IoAndroidRefresh from 'react-icons/lib/io/android-refresh';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{

  constructor(props) {
    super(props);
    this.state = {
      serverName : ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.distanceButtons = this.distanceButtons.bind(this);
    this.slider = this.slider.bind(this);
    this.customUnitsOptions = this.customUnitsOptions.bind(this);

    this.customServerConnection = this.customServerConnection.bind(this);
    this.interoperability = this.interoperability.bind(this);
  }

  customServerConnection(e) {
    console.log("OPTIONS: " + e.target.value);
    this.setState({serverName : e.target.value})
  }

  handleOnChange(arg) {
    this.props.updateOptions(arg.target.value);
  }

  updateUnit(arg) {
    let value = arg.target.value;
    if(!isNaN(value)) {
      value = value >= 0 ? value : 2000;
    }
    this.props.updateOptionsUnits(arg.target.id, value);
  }

  static warning(val){
    if(val > 0.0){
      return (<div className="pt-4">
        <p className="col-9 m-0 p-0 text_canyon">Warning: Shorter trips will take longer to compute.</p>
      </div>);
    }else return null;
  }

  slider(){
    let step = this.props.config.optimization;
    let val = parseFloat(this.props.trip.options.optimization);
    console.log("step: " + step);
    if (isNaN(val)) {
      val = 0.0;
    }
    let warning = Options.warning(val);
    if (step !== undefined)
      return(
        <div className="slider_container">
          <br/><input type="range" id="optimizer" min="0" max="1.00" step={1.00/step} value={val} className="slider" onInput={this.handleOnChange} />
          <div className="row pt-2 pl-3">
            <div className="col-12">
              <div className="row">
                <h6 className="pr-4 m-0">Longer</h6>
                <h6 className="m-0">Shorter</h6>
              </div>
            </div>
          </div>
          {warning}
        </div>
      );
    return (null);
  }

  distanceButtons() {
    let options = this.props.config.units;
    for (let index = 0; index < options.length; ++index) {
      options[index] = options[index].charAt(0).toUpperCase() + options[index].substr(1);
    }
    const buttons = options.map((option) =>
        <Button key={option} active={(this.props.trip.options.distance === "" ? "miles" : this.props.trip.options.distance) === option.toLowerCase()} value={option.toLowerCase()}
                onClick={this.handleOnChange} className="green_btn green_hvr">{option}</Button>
    );
    return buttons;
  }

  customUnitsOptions() {
    if (this.props.trip.options.distance === "user defined") {
        return (
            <div className="custom-units-container input-group-sm mb-3 p-2 green_unit">
                <input id="userUnit" type="text" className="form-control custom-unit-name"
                       onBlur={this.updateUnit} defaultValue={this.props.trip.options.userUnit} placeholder="Unit Name..."/>
                <input id="userRadius" type="number" className="form-control custom-unit-radius"
                       onBlur={this.updateUnit} defaultValue={this.props.trip.options.userRadius} placeholder="Unit Earth radius..."/>
            </div>
        );
    }
    return null;
  }

  interoperability() {
    return (
      <div>
        <br/>
        <h6 className="larger-CSUtext-uncap">Custom Server Connection</h6>
        <div id="flex-container">
          <div className="flex-item">
            <input id="trip-title" type="text" className="form-control"
                   onChange={(e) => this.customServerConnection(e)} placeholder="Input host and port..."/>
          </div>
          <div className="static-item">
            <ButtonGroup>
              <label><IoAndroidDone className="green_logo green_hvr_logo" size={38}
                                    onClick={() => this.props.updateHost(this.state.serverName)}
                                    data-for="submit" data-tip="Submit"/></label>
              <ReactTooltip id="submit" place="bottom" effect="solid"/>
              <label><IoAndroidRefresh className="green_logo green_hvr_logo" size={38}
                                       onClick={() => this.props.updateHost(location.host)}
                                       data-for="reset" data-tip="Reset"/></label>
              <ReactTooltip id="reset" place="bottom" effect="solid"/>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let slider = null;
    if (this.props.config.optimization > 0) slider = this.slider();
    return(
      <div id="options" >
        <h6 className="larger-CSUtext-uncap">Select the options you wish to use.</h6>
          <ButtonGroup>
            <Container>
              {this.distanceButtons()}
            </Container>
          </ButtonGroup>
        <div className="row">
            <div className="col-sm-6 order-last order-md-first">
                {slider}
            </div>
            <div className="col-sm-6 order-first order-md-last">
                {this.customUnitsOptions()}
            </div>
        </div>
        {this.interoperability()}
      </div>
    )
  }
}

export default Options;