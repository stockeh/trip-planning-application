import React, {Component} from 'react';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);

    // this.state = {
    //   optimization: 0
    // }

    this.changeOption = this.changeOption.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  changeOption(arg) {
    // console.log("changeOption " + arg.target.id);
    this.props.updateOptions(arg.target.id);

  }

  handleOnChange (arg) {
    this.props.updateOptions(arg.target.value);
  }

  render() {
    // @todo need to update the options when a button is pressed
    return(
        <div id="options" className="card">
          <div className="card-header bg-info text-white">
            Options
          </div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
            <div className="btn-group">
              <label className="btn btn-outline-dark btn-sm">
                <input type="radio" id="miles" name="distance" onChange={this.changeOption}defaultChecked/> Miles
              </label>
              <label className="btn btn-outline-dark btn-sm">
                <input type="radio" id="kilometers" name="distance" onChange={this.changeOption}/> Kilometers
              </label>
            </div>
            <div className="slider_container">
              <input type="range" id="optimizer" min="0" max="1" value={this.props.optimization} className="slider" onChange={this.handleOnChange} />
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