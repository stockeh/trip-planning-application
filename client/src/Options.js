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
  }

  handleOnChange(arg) {
    this.props.updateOptions(arg.target.value);
  }

  distanceButtons() {
    const options = ["Miles", "Kilometers", "Nautical Miles"];
    const buttons = options.map((option) =>
        <Button key={option} active={this.props.options.distance === option.toLowerCase()} value={option.toLowerCase()}
                onClick={this.handleOnChange} className='btn-outline-dark'>{option}</Button>
    );
    return buttons;
  }

  render() {
    const buttons = this.distanceButtons();
    return(
        <div id="options" className="card">
          <div className="card-header bg-info text-white">Options</div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
            <div className="slider_container">
              <br/><input type="range" id="optimizer" min="0" max="1" value={this.props.options.optimization} className="slider" onChange={this.handleOnChange} />
              <div className="row pl-3">
                <h6 className="pr-4 m-0">Longer</h6>
                <h6 className="m-0">Shorter</h6>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Options;