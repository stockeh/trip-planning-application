import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.distanceButtons = this.distanceButtons.bind(this);
    this.slider = this.slider.bind(this);
  }

  handleOnChange(arg) {
    this.props.updateOptions(arg.target.value);
  }

  slider(){
    let step = this.props.config.optimization;
    if (step !== undefined)
      return(
        <div className="slider_container">
          <br/><input type="range" id="optimizer" min="0" max="1" step={1.00/step} value={parseFloat(this.props.trip.options.optimization)} className="slider" onChange={this.handleOnChange} />
          <div className="row pl-3">
            <div className="col-6">
              <div className="row">
                <h6 className="pr-4 m-0">Longer</h6>
                <h6 className="m-0">Shorter</h6>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <p className="col-6 m-0 p-0 text-warning">Warning: Shorter trips will take longer to compute.</p>
          </div>
        </div>
      );
    return (null);
  }

  distanceButtons() {
    let options = this.props.config.supportedDistances;
    for (let index = 0; index < options.length; ++index) {
      options[index] = options[index].charAt(0).toUpperCase() + options[index].substr(1);
    }
    const buttons = options.map((option) =>
        <Button key={option} active={this.props.trip.options.distance === option.toLowerCase()} value={option.toLowerCase()}
                onClick={this.handleOnChange} className='btn-outline-dark'>{option}</Button>
    );
    return buttons;
  }

  render() {
    const buttons = this.distanceButtons();
    let slider = null;
    if(this.props.trip.version > 1 && this.props.config.optimization > 0){
      slider = this.slider();
    }
    return(
        <div id="options" className="card">
          <div className="card-header bg-info text-white">Options</div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
            {slider}
          </div>
        </div>
    )
  }
}

export default Options;