import React, {Component} from 'react';
import Query from './Query';

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
    try {
        reader.onload = this.parseFileLoad;
        reader.readAsText(event.target.files[0]);
    } catch (e) {
        console.log(e);
    }
  }
  parseFileLoad(event){
      var title;
      try {
          var json = JSON.parse(event.target.result);
          this.props.updateTrip(json);
          title = this.props.trip.title;;
      } catch (error) {
          console.log(error);
          title = "Error Loading File";
      }
      document.getElementById('trip-title').value = title;
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
            <p>Find destinations to add to your trip.</p>
            <Query trip={this.props.trip} updatePlaces={this.props.updatePlaces}/>
            <br/><h5>There are {count} destinations. </h5>
          </div>
        </div>
    )
  }
}

export default Destinations;