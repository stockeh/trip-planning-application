class Calculator extends React.Component {
  constructor(props) {
    super(props);
    /* state variables */
    this.state = {
      dist: "", 
      coordinate1: "",
      coordinate2: "",
      latitude1: "",
      longitude1: "",
      latitude2: "",
      longitude2: "",
      unit: "mi"
    };
    /* must bind all functions in constructor */
    this.updateCoordinate1 = this.updateCoordinate1.bind(this);
    this.updateCoordinate2 = this.updateCoordinate2.bind(this);
    this.parseLocation = this.parseLocation.bind(this);
    this.decimalDegrees = this.decimalDegrees.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
  }

  toRadians(angle) { return angle * (Math.PI / 180); }

  distance(lat1, lon1, lat2, lon2, unit) {
    if(lat1 == -1000 || lat2 == -1000 || lon1 == -1000 || lat2 == -1000)return null;
    var x, y, z, radius, chordLength, centralAngle;
    if (unit == "km")
        radius = 6371.0088;
    else radius = 3958.7613;
    x = Math.cos(this.toRadians(lat2)) * Math.cos(this.toRadians(lon2)) -
        Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lon1));
    y = Math.cos(this.toRadians(lat2)) * Math.sin(this.toRadians(lon2)) -
        Math.cos(this.toRadians(lat1)) * Math.sin(this.toRadians(lon1));
    z = Math.sin(this.toRadians(lat2)) - Math.sin(this.toRadians(lat1));

    chordLength = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)+Math.pow(z,2));
    centralAngle = 2 * Math.asin(chordLength / 2);

    return Math.round(radius * centralAngle);
  }

  updateCoordinate1(event) {
    /* update the value of lat 1, lat1 and coordinate1 */
    var coord2 = $('#input2').val(); /** Used so that the output field does not display results until both coordinates are inputted are met. **/
    this.setState({coordinate1 : event.target.value});
    this.setState({latitude1 : this.parseLocation(event)[0]});
    this.setState({longitude1 : this.parseLocation(event)[1]});
    if (coord2.length){ /** Are there coordinates in the second field? **/
      var temp = this.distance(this.parseLocation(event)[0], this.parseLocation(event)[1], this.state.latitude2, this.state.longitude2, this.state.unit);
      if (temp != null)
        this.setState({dist: Number(temp)});
      else this.setState({dist: "Invalid Format"});
    }
  }

  updateCoordinate2(event) {
    /* update the value of lat 2, lat2 and coordinate2 */
    var inputField1 = $('#input1').val(); /** Used so that the output field does not display results until both coordinates are inputted are met. **/
    this.setState({coordinate2 : event.target.value});
    this.setState({latitude2 : this.parseLocation(event)[0]});
    this.setState({longitude2 : this.parseLocation(event)[1]});
    if (inputField1.length) {/** Are there coordinates in the first field? **/
      var temp = this.distance(this.state.latitude1, this.state.longitude1, this.parseLocation(event)[0], this.parseLocation(event)[1], this.state.unit);
      if (temp != null)
        this.setState({dist: Number(temp)});
      else this.setState({dist: "Invalid Format"});
    }
  }

  parseLocation(event) {
    //returns null if coordinate format is invalid
    const coordRegex = /^(?:-?\d+(?:\.\d+)?|(?:\d+(?:\.\d+)?°)(?:\s\d+(?:\.\d+)?['|`|'|‘|’|′])?(?:\s\d+(?:\.\d+)?["|”|“|″])?\s[NS])\s(?:-?\d+(?:\.\d+)?|(?:\d+(?:\.\d+)?°)(?:\s\d+(?:\.\d+)?['|`|'|‘|’|′])?(?:\s\d+(?:\.\d+)?["|”|“|″])?\s[EW])$/;
    const coordArr = event.target.value.match(coordRegex);
    if(coordArr == null){//this is where an error should be thrown since the entered coordinates were not in a supported format
      return [-1000,-1000];
    }
    let coordinates = coordArr[0];
    coordinates = coordinates.replace(/°|'|`|'|‘|’|′|"|”|“|″/g, "");
    const latIndex = coordinates.search(/[NS]/);
    const longIndex = coordinates.search(/[EW]/);
    // console.log("COORDINATES: " + coordinates);
    let result = null;
    if (latIndex == -1 && longIndex == -1) {  //already in correct format so return in array
      result = coordinates.split(" ")

    } else if (latIndex > 0 && longIndex > 0) {  //full format must analyze both latitude and longitude returns array formatted in decimal degrees
      const latitude = coordinates.substring(0,latIndex + 1);
      const longitude = coordinates.substring(latIndex+2);
      const latArr = latitude.split(" ");
      const longArr = longitude.split(" ");
      const latDegree = this.decimalDegrees(latArr);
      const longDegree = this.decimalDegrees(longArr);
      result = [latDegree,longDegree];
      // console.log("PARSED COORDS V1: " + result);

    }else if(latIndex > 0 && longIndex == -1){  //latitude must be reduced further but longitude is in correct format
      const latitude = coordinates.substring(0, latIndex + 1);
      //console.log("INDEX: " + latitude);
      const longDegree = coordinates.substring(latIndex+2);
      const latArr = latitude.split(" ");
      result = [this.decimalDegrees(latArr), longDegree];
      // console.log("PARSED COORDS V2: " + result);

    }else if(latIndex == -1 && longIndex > 0){  //
      const longitude = coordinates.substring(coordinates.indexOf(" ")+1);
      const latDegree = coordinates.substring(0,coordinates.indexOf(" "));
      const longArr = longitude.split(" ");
      result = [latDegree, this.decimalDegrees(longArr)];
      // console.log("PARSED COORDS V3: " + result);
    }
    if(result[0] > 90 || result[0] < -90 || result[1] > 180 || result[1] < -180 || result == null){
      result = [-1000,-1000];
    }
    return result;
  }

  directionHandler(degree,direction){
    //returns inverted decimal degree if direction is South or West
    if(direction == 'S' || direction == 'W')return -degree;
    else return degree;
  }

  calculateDegrees(degrees,minutes,seconds){
    //returns decimal degree from passed degrees minutes and seconds
    //minutes and seconds are not required and will default to 0
    if(minutes === undefined)minutes = 0;
    if(seconds === undefined)seconds = 0;
    return (Number(degrees) + Number(minutes/60) + Number(seconds/3600));
  }

  decimalDegrees(coordArr){
    //accepts array of coordinates with direction as last element and reformats it to decimal degrees
    if(coordArr.length == 2){
      return this.directionHandler(this.calculateDegrees(coordArr[0]),coordArr[1]);
    }else if(coordArr.length == 3){
      return this.directionHandler(this.calculateDegrees(coordArr[0], coordArr[1]),coordArr[2]);
    }else if(coordArr.length == 4){
      return this.directionHandler(this.calculateDegrees(coordArr[0], coordArr[1], coordArr[2]),coordArr[3]);
    }
  }

    updateUnit(event) {
        this.setState({unit : event.target.value});
        this.setState({dist : Number(this.distance(this.state.latitude1, this.state.longitude1, this.state.latitude2, this.state.longitude2, event.target.value)) });
    }

    render() {
        /* a simple form with text input and a submit button  */
        return (
            <form>
                <div className="row">
                    <div className="col-md-4">
                        <input type="text" className="text-right form-control mr-sm-2" placeholder="Input Starting Coordinates" id="input1"
                               value={this.state.coordinate1} onChange={this.updateCoordinate1}/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="text-right form-control mr-sm-2" placeholder="Input Ending Coordinates" id="input2"
                               value={this.state.coordinate2} onChange={this.updateCoordinate2}/>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <input type="text" className="text-right form-control mr-sm-2" placeholder="Resulting Distance"
                               value={this.state.dist} disabled/>
                    </div>
                    <div className="col-md-4 mt-1">
                        <div className="btn-group">
                            <label className="btn btn-outline-dark btn-sm">
                                <input value="mi" type="radio" onChange={this.updateUnit} checked={this.state.unit == "mi"}/> Miles
                            </label>
                            <label className="btn btn-outline-dark btn-sm">
                                <input value="km" type="radio" onChange={this.updateUnit} checked={this.state.unit == "km"}/> Kilometers
                            </label>
                        </div>
                    </div>
                </div>
                <hr/>
            </form>
        )
    }
}

class FileIn extends React.Component {

    fileListener(event) {
        var reader = new FileReader();
        reader.onload = this.onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    onReaderLoad(event){
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        console.log(obj[0].id);
    }

    render() {
      return (
        <div className="fileinput fileinput-new" data-provides="fileinput">
          <p>Select file to process</p>
          <input id="upload" ref="upload" type="file" onChange={(event)=> {
            this.fileListener(event)
          }}
            onClick={(event)=> {
            event.target.value = null
          }} />
        </div>
      )
    }
}

class Application extends React.Component {

  render() {
    /* separate the page layout from the calculator function */
    return (
      <div className="jumbotron">
        <h3>Distance Calculator</h3>
        <hr/>
        <Calculator />
        {/*<br/>*/}
        {/*<FileIn />*/}
      </div>
    )
  }
}

ReactDOM.render(<Application  />, document.getElementById("application"));
