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
    this.state = {
      config: {
        type: "config",
        version : 2,
        optimization: 1
      },
      check : true
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.distanceButtons = this.distanceButtons.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.slider = this.slider.bind(this);
  }

  fetchResponse(){

    return fetch('http://' + location.host + '/config', {
      method:"GET",
    });
  }

  async getConfig(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log("TESTING: " + tffi.optimization);
      this.setState({config : tffi});
      this.setState({check:false});
    } catch(err) {
      console.error(err);
    }
  }

  handleOnChange(arg) {
    this.props.updateOptions(arg.target.value);
  }

  slider(){
    let step = this.state.config.optimization;
    if (step !== undefined)
      return(
        <div className="slider_container">
          <br/><input type="range" id="optimizer" min="0" max="1" step={1.00/step} value={parseFloat(this.props.trip.options.optimization)} className="slider" onChange={this.handleOnChange} />
          <div className="row pl-3">
            <h6 className="pr-4 m-0">Longer</h6>
            <h6 className="m-0">Shorter</h6>
          </div>
        </div>
      );
    return (null);
  }

  distanceButtons() {
    const options = ["Miles", "Kilometers", "Nautical Miles"];
    const buttons = options.map((option) =>
        <Button key={option} active={this.props.trip.options.distance === option.toLowerCase()} value={option.toLowerCase()}
                onClick={this.handleOnChange} className='btn-outline-dark'>{option}</Button>
    );
    return buttons;
  }

  render() {
    if(this.state.check === true) this.getConfig();
    const buttons = this.distanceButtons();
    let slider = null;
    if(this.props.trip.version > 1 && this.state.config.optimization > 0){
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