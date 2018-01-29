class Info extends React.Component{
	render(){
	return(
	<h2 class="text-white display-3 text-center pb-3 border-bottom">Alex Segura</h2>
      <div class="container-fluid text-white">
        <dl class="row">
          <dd class="col-xs-12 col-sm-4">2967 Silverplume Dr. Fort Collins, CO 80526</dd>
          <dd class="col-xs-12 col-sm-4 text-center">alexfro@rams.colostate.edu</dd>
          <dd class="col-xs-12 col-sm-4 text-right">(720)-620-3947</dd>
        </dl>
      </div>
	);
	}
}

class Summary extends React.Component{
        render(){
        return(
      <h4 class="text-light text-center font-weight-light pb-3">Professional Summary: During my experience at CSU, I have gained extensive knowledge about programming, the behavior of integrated circuits, and architecture in modern technology. My work experience has allowed me to build a strong work ethic, leadership qualities, and team coping skills. My interests include parallel programming, networking, and security.</h4>
        );
        }
}

class Education extends React.Component{
        render(){
        return(
        <div class="Education">  
    <h4 class="text-light text-left pb-3 text-bold">Education</h4>
      <div class="container text-light pb-3">
        <dl class="row">
          <div class="col-sm">
            <dt class="text-uppercase font-italic">Colorado State University</dt>
            <dd>B.S - Computer Engineering</dd>
          </div>
          <div class="col-xs">
            <dt class="text-uppercase text-right font-italic">Expected Graduation - Spring 2018</dt>
             <dd class="text-right">GPA 2.87</dd>
          </div>
        </dl>
</div>
</div>
        );
        }
}

class Experience extends React.Component{
        render(){
        return(
        <div class="Experience">
    <h4 class="text-light text-left pb-3 text-bold">Experience</h4>
      <div class="container text-light pb-3">
        <dl class="row">
          <div class="col-xs">
            <dt class="text-uppercase font-italic">CSU Academic Computing + Networking Services</dt>
            <dd>Student Coordinator</dd>
            <dd>- LLDPi, Developed Network Tool to Obtain LLDP information from network</dd>
            <dd>- RAMPi, Maintained Network Latency Monitoring Tool</dd>
            <dd>- RAM FARM, Maintained Wireless Density Testing Tool</dd>              
            <dd>- Managed Network Equipment Inventory</dd>
          </div>
          <div class="col-sm">
            <dt class="text-uppercase text-right font-italic">May 2017 - Present</dt>
          </div>
        </dl>
</div>
</div>
        );
        }
}

class Skills extends React.Component{
        render(){
        return(
        <div class="Skills">
      <h4 class="text-light text-left pb-3 text-bold">Skills</h4>
          <div class="container text-light pb-3">
            <div class="col-xs text-white">
            <dd>- C, C++, Bash, Java, Python, Apache, MATLAB</dd>
            <dd>- Soldering, Oscilloscopes/Function Generators, Multimeters</dd>
            <dd>- Fluent Spanish</dd>
          </div>
            <hr>
          </div>
          </div>
        );
        }
}

class Awards extends React.Component{
        render(){
        return(
	<div class="Awards">
      <h4 class="text-light text-left pb-3 text-bold">Awards</h4>
          <div class="container text-light pb-3">
            <div class="col-xs text-white">
            <dd>- IEEE HKN Member (Eta Kappa Nu ECE Honor Society)</dd>
            <dd>- CSU Bridge Scholar</dd>
            <dd>- Fort Lupton HS Highest Class ACT Score </dd>
            <dd>- Daniel's Fund Scholarship Finalist </dd>
            </div>
            <hr>
          </div>
          </div>
        );
        }
}


class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <Info />
        </div>  
        <Summary />
        <hr/>
        <Education />  
        <hr/>
        <Experience />
        <hr/>
        <Skills />
        <Awards />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
