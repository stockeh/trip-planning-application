import React, {Component} from 'react';

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */
class Destinations extends Component {
  constructor(props) {
    super(props);
    this.loadTFFI = this.loadTFFI.bind(this);
    this.parseFileLoad = this.parseFileLoad.bind(this);
  }

  loadTFFI(event) {
    // console.log(event.target.files[0].name);
    var reader = new FileReader();
    reader.onload = this.parseFileLoad;
    reader.readAsText(event.target.files[0]);
  }
  parseFileLoad(event){
    // console.log(event.target.result);
    var json = JSON.parse(event.target.result);
    this.props.updateTrip(json);
    document.getElementById('trip-title').value = this.props.trip.title;
  }

  render() {
    // need to clean up the button
    const count = this.props.trip.places.length; // need to count the number in the trip
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-info text-white">
            Destinations
          </div>
          <div className="card-body">
            <p>Load destinations from a file.</p>
            <div className="form-group" role="group">
                <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
            </div>
            <h5>There are {count} destinations. </h5>
          </div>
        </div>
    )
  }
}

export default Destinations;