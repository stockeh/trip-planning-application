class Calculator extends React.Component {
  constructor(props) {
    super(props);
    /* state variables */
    this.state = {
      sum: "",
      operand1: "",
      operand2: "",
      operand2: ""
    };
    /* must bind all functions in constructor */
    this.calc = this.calc.bind(this);
    this.updateOperand1 = this.updateOperand1.bind(this);
    this.updateOperand2 = this.updateOperand2.bind(this);
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

    /* console.log("X: ", x, '\n',"Y: ", y, '\n',"Z: ", x, '\n',"R: ", radius, '\n',"C: ", chordLength, '\n',"Central Angle: ", centralAngle, '\n'); */
    return Math.round(radius * centralAngle);
  }

  updateOperand1(event) {
    /* update the value of operand 1.  needs validation */
    this.setState({operand1 : event.target.value});
    this.setState({sum : this.parseLocation(event)});
  }
  //
  updateOperand2(event) {
    /* update the value of operand 2.  needs validation */
    this.setState({operand2 : event.target.value});
    this.setState({sum : this.parseLocation(event)});
  }

  parseLocation(event) {
    const coordRegex = /^(?:-?\d+(?:\.\d+)?|(?:\d+(?:\.\d+)?°)(?:\s\d+(?:\.\d+)?')?(?:\s\d+(?:\.\d+)?")?\s[NS])\s(?:-?\d+(?:\.\d+)?|(?:\d+(?:\.\d+)?°)(?:\s\d+(?:\.\d+)?')?(?:\s\d+(?:\.\d+)?")?\s[EW])$/;
    const coordArr = event.target.value.match(coordRegex);
    if(coordArr == null){
      return null;//this is where an error should be thrown since the entered coordinates were not in a supported format
    }
    let coordinates = coordArr[0];

    coordinates = coordinates.replace(/°|'|"/g, "");
    const latIndex = coordinates.search(/[NS]/);
    const longIndex = coordinates.search(/[EW]/);
    // console.log("COORDINATES: " + coordinates);
    if (latIndex == -1 && longIndex == -1) {  //already in correct format so return in array
      return coordinates.split(" ");

    } else if (latIndex > 0 && longIndex > 0) {  //full format must analyze both latitude and longitude returns array formatted in decimal degrees
      const latitude = coordinates.substring(0,latIndex + 1);
      const longitude = coordinates.substring(latIndex+2);
      console.log(latitude);
      const latArr = latitude.split(" ");
      const longArr = longitude.split(" ");
      const latDegree = this.decimalDegrees(latArr);
      const longDegree = this.decimalDegrees(longArr);
      const result = [latDegree,longDegree];
      // console.log("PARSED COORDS V1: " + result);
      return result;

    }else if(latIndex > 0 && longIndex == -1){  //latitude must be reduced further but longitude is in correct format
      const latitude = coordinates.substring(0, latIndex + 1);
      //console.log("INDEX: " + latitude);
      const longDegree = coordinates.substring(latIndex+2);
      const latArr = latitude.split(" ");
      const result = [this.decimalDegrees(latArr), longDegree];
      // console.log("PARSED COORDS V2: " + result);
      return result;

    }else if(latIndex == -1 && longIndex > 0){  //
      const longitude = coordinates.substring(coordinates.indexOf(" ")+1);
      const latDegree = coordinates.substring(0,coordinates.indexOf(" "));
      const longArr = longitude.split(" ");
      const result = [latDegree, this.decimalDegrees(longArr)];
      // console.log("PARSED COORDS V3: " + result);
      return result;
    }
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
    //accepts array of coordinates with direction as last element and reformats to decimal degrees
    if(coordArr.length == 2){
      return this.directionHandler(this.calculateDegrees(coordArr[0]),coordArr[1]);
    }else if(coordArr.length == 3){
      return this.directionHandler(this.calculateDegrees(coordArr[0], coordArr[1]),coordArr[2]);
    }else if(coordArr.length == 4){
      return this.directionHandler(this.calculateDegrees(coordArr[0], coordArr[1], coordArr[2]),coordArr[3]);
    }
  }


  calc(event) {
    /* Operands are text.  Must convert to add rather than concatenate. */
    this.setState({sum : Number(this.state.operand1) + Number(this.state.operand2) })
    event.preventDefault();
  }

  render() {
    /* a simple form with text input and a submit button  */
    return (
      <form className="form-inline" onSubmit={this.calc}>

        <input type="text" className="text-right form-control mr-sm-2" 
          value={this.state.operand1} onChange={this.updateOperand1}/>

        <button className="btn btn-secondary mr-sm-2" disabled>+</button>

        <input type="text" className="text-right form-control mr-sm-2" 
          value={this.state.operand2} onChange={this.updateOperand2}/> 

        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" 
          disabled>=</button>

        <input type="text" className="text-right form-control mr-sm-2" 
          value={this.state.sum} disabled/>
      </form>

    )
  }
}

class Application extends React.Component {
  render() {
    /* separate the page layout from the calculator function */
    return (
      <div className="jumbotron">
        <h3>CS 314 - Simple Adder</h3>
        <hr/>
        <Calculator />
      
        <br/>
        
        <div className="fileinput fileinput-new" data-provides="fileinput">
          <p>Select file to process</p>
          <span className="btn btn-default btn-file"><span></span><input type="file" /></span>
          <span className="fileinput-filename"></span><span className="fileinput-new"></span>
        </div>
      </div>  
    )
  }
}

ReactDOM.render(<Application  />, document.getElementById("application"));
