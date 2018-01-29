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
    if(parsed == null)return "";
    else if(parsed.length == 2)return parsed;
    else{
      var degrees = [];
      var latitude = parsed.splice(0,parsed.length/2);
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
          <input id="upload" ref="upload" type="file" onChange={(event)=> { 
                       this.fileListener(event) 
                  }}
                onClick={(event)=> { 
                       event.target.value = null
                  }}
        />
      </div>  
    )
  }
}

ReactDOM.render(<Application  />, document.getElementById("application"));
