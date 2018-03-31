import React, {Component} from 'react';
import {ButtonGroup, Button, Container} from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.distanceButtons = this.distanceButtons.bind(this);
    this.slider = this.slider.bind(this);
    this.customUnitsOptions = this.customUnitsOptions.bind(this);
  }

  handleOnChange(arg) {
    this.props.updateOptions(arg.target.value);
  }

  updateUnit(arg) {
    this.props.updateOptionsUnits(arg.target.id, arg.target.value);
  }

  static warning(val){
    if(val > 0.0){
      return (<div className="pt-4">
        <p className="col-9 m-0 p-0 text-warning">Warning: Shorter trips will take longer to compute.</p>
      </div>);
    }else return null;
  }

  slider(){
    let step = this.props.config.optimization;
    let val = parseFloat(this.props.trip.options.optimization);
    if (isNaN(val)) {
      val = 0.0;
    }
    let warning = Options.warning(val);
    if (step !== undefined)
      return(
        <div className="slider_container">
          <br/><input type="range" id="optimizer" min="0" max="1" step={1.00/step} value={val} className="slider" onChange={this.handleOnChange} />
          <div className="row pl-3">
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
    let options = this.props.config.distances;
    for (let index = 0; index < options.length; ++index) {
      options[index] = options[index].charAt(0).toUpperCase() + options[index].substr(1);
    }
    const buttons = options.map((option) =>
        <Button key={option} active={this.props.trip.options.distance === option.toLowerCase()} value={option.toLowerCase()}
                onClick={this.handleOnChange} className='btn-outline-dark'>{option}</Button>
    );
    return buttons;
  }

  customUnitsOptions() {
    if (this.props.trip.options.distance === "user defined") {
        return (
            <div className="custom-units-container input-group-sm mb-3 p-2">
                <input id="userUnit" type="text" className="form-control custom-unit-name"
                       onBlur={this.updateUnit}  placeholder="Unit Name..."/>
                <input id="userRadius" type="number" className="form-control custom-unit-radius"
                       onBlur={this.updateUnit}  placeholder="Unit Earth radius..."/>
            </div>
        );
    }
    return null;
  }

  render() {
    let slider = null;
    if (this.props.config.optimization > 0) slider = this.slider();
    return(
        <div id="options" className="card">
          <div className="card-header bg-info text-white">Options</div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
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
          </div>
        </div>
    )
  }
}

export default Options;