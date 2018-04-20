import React, {Component} from 'react';
import { bg_csu_green } from './css/styling.css';
import IoIosUploadOutline from 'react-icons/lib/io/ios-upload-outline';
import ReactTooltip from 'react-tooltip'

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
          if(!json.hasOwnProperty("distances")){json["distances"] = [];}
          this.props.updateTrip(json);
          title = this.props.trip.title;
      } catch (error) {
          console.log(error);
          title = "Error Loading File";
      }
      document.getElementById('trip-title').value = title;
  }

  render() {
    return (
      <div id="destinations">
        <input type="file" id="tffifile" className="form-control" hidden/>
        <label for="tffifile" >
          <IoIosUploadOutline className="green_logo green_hvr_logo" size={38} onChange={this.loadTFFI} data-for="upload" data-tip="Upload"/>
          <ReactTooltip id="upload" place="bottom" effect="solid"/>
        </label>
      </div>
    )
  }
}

export default Destinations;