import React, {Component} from 'react';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
  }

  changeOption(arg) {
    // console.log("changeOption " + arg.target.id);
    this.props.updateOptions(arg.target.id);
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
          </div>
        </div>
    )
  }
}

export default Options;