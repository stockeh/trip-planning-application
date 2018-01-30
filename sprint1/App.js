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
    };
    /* must bind all functions in constructor */
    this.updateCoordinate1 = this.updateCoordinate1.bind(this);
    this.updateCoordinate2 = this.updateCoordinate2.bind(this);
    this.parseLocation = this.parseLocation.bind(this);
    this.decimalDegrees = this.decimalDegrees.bind(this);
  }

  toRadians(angle) { return angle * (Math.PI / 180); }

  distance(lat1, lon1, lat2, lon2, unit) {
    var x, y, z, radius, chordLength, centralAngle;
    if (unit == "K")
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
    if (coord2.length) /** Are there coordinates in the second field? **/
       this.setState({dist : Number(this.distance(this.parseLocation(event)[0], this.parseLocation(event)[1], this.state.latitude2, this.state.longitude2, "M")) });
  }

  updateCoordinate2(event) {
    /* update the value of lat 2, lat2 and coordinate2 */
    var inputField1 = $('#input1').val(); /** Used so that the output field does not display results until both coordinates are inputted are met. **/
    this.setState({coordinate2 : event.target.value});
    this.setState({latitude2 : this.parseLocation(event)[0]});
    this.setState({longitude2 : this.parseLocation(event)[1]});
    if (inputField1.length) /** Are there coordinates in the first field? **/
        this.setState({dist : Number(this.distance(this.state.latitude1, this.state.longitude1, this.parseLocation(event)[0], this.parseLocation(event)[1], "M")) });
  }

  parseLocation(event) {
    var parsed = event.target.value.match(/(-?\d+((\.\d+))*|[NSEW])+/g);
    return this.decimalDegrees(parsed);
  }

  directionHandler(degree,direction){
    //console.log(degree + " " + direction);
    if(direction == 'S' || direction == 'W')return -degree;
    else return degree;
  }

  calculateDegrees(degrees,minutes = 0,seconds = 0){
    return (Number(degrees) + Number(minutes/60) + Number(seconds/3600));
  }

  decimalDegrees(parsed){
    if(parsed == null) return "";
    else if(parsed.length == 2)return parsed;
    else{
      var degrees = [];
      var latitude = parsed.splice(0,parsed.length/2); /** Assuming both Lat and Lon are the same format **/
      var longitude = parsed;
      if(latitude.length == 2){
        degrees.push(this.directionHandler(latitude[0],latitude[1]));
        degrees.push(this.directionHandler(longitude[0],longitude[1]));
      }else if(latitude.length == 3){
        degrees.push(this.directionHandler(this.calculateDegrees(latitude[0],latitude[1]),latitude[2]));
        degrees.push(this.directionHandler(this.calculateDegrees(longitude[0],longitude[1]),longitude[2]));
      }else if(latitude.length == 4){
        degrees.push(this.directionHandler(this.calculateDegrees(latitude[0],latitude[1],latitude[2]),latitude[3]));
        degrees.push(this.directionHandler(this.calculateDegrees(longitude[0],longitude[1],longitude[2]),longitude[3]));
      }
      return degrees;
    }
  }

  render() {
    /* a simple form with text input and a submit button  */
    return (
      <form className="form-inline">

        <input type="text" className="text-right form-control mr-sm-2 col-3" placeholder="Input Starting Coordinates" id="input1"
          value={this.state.coordinate1} onChange={this.updateCoordinate1}/>

        <input type="text" className="text-right form-control mr-sm-2 col-3" placeholder="Input Ending Coordinates" id="input2"
          value={this.state.coordinate2} onChange={this.updateCoordinate2}/>

        <input type="text" className="text-right form-control mr-sm-2" placeholder="Resulting Distance"
          value={this.state.dist} disabled/>
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
        <br/>
        <FileIn />
      </div>
    )
  }
}

ReactDOM.render(<Application  />, document.getElementById("application"));