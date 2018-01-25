class Title extends React.Component{
  render(){
    return(<h2 className="text-dark display-3 text-center pb-5 border-bottom">Evan Steiner</h2>);
  }
}

class Header extends React.Component{
  render(){
    return( 
      <div className="container-fluid text-dark">
        <dl className="row">
          <dd className="col-xs-12 col-sm-4">School Year: 402 Alpine Hall Fort Collins, CO 80521</dd>
          <dd className="col-xs-12 col-sm-4">Summer: 10315 38th Ave NE Seattle WA 98125</dd>
          <dd className="col-xs-12 col-sm-4">(206) 681-4836— evanjs97@gmail.com</dd>
        </dl>
      </div>
    )
  }
}

class PersonalStatement extends React.Component{
  render(){
    return (<h6 className="text-light text-center font-weight-light pb-3">Personal Statement: Reliable and mature college sophomore seeking work in software engineering. Experience with many programming languages and technologies</h6>);
  }
}
            
class Education extends React.Component{
  render(){
    return(
      <div>
        <h5 className="text-light text-center pb-3">Education</h5>
        <div className="container text-light pb-3">
          <dl className="row">
            <div className="col-sm">
              <dt className="text-uppercase font-italic">Colorado State University</dt>
              <dd>- Fall 2016-Present, Computer Science Major, GPA: 3.61</dd>
            </div>
            <div className="col-sm">
              <dt className="text-uppercase font-italic">Nathan Hale High School</dt>
              <dd>- 2012-2016, GPA: 3.86</dd>
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
    <div>
      <h5 className="text-light text-center">Skills</h5>
      <p className ="text-light text-center">Java, C, C++, Python, HTML, CSS, Bootstrap, Microsoft Office, Windows, Linux, macOS, git</p> 
    </div>
    );
  }
}

class WorkExperience extends React.Component{
  render(){
    return(
      <div>
        <h5 className="text-light text-center pb-3">Work/Volunteer Experience</h5>
        <div className="container text-light pb-3">
          <dl className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">Reach Out Volunteers in Peru</dt>
              <dd>- Built green houses in Misminay, Peru to help with local food supply and village sustainability</dd>
              <dd>- Worked with and helped out kids from the village</dd>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">Dining Center in Laurel Village</dt>
              <dd>- Worked on Grill line in Durrell Express</dd>
              <dd>- Dishwasher</dd>
              <dd>- Food Server</dd>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">BikeWorks Volunteer</dt>
              <dd>- Repaired bicycles for donation to low income youth in the greater Seattle area</dd>
              <dd>- Personally created and hosted a bicycle drive to collect used bicycles for donation to BikeWorks</dd>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">Seattle Aquarium Volunteer</dt>
              <dd>- Educated Seattle Aquarium visitors on marine life and environmental concerns</dd>
              <dd>- Participated in beach cleanups</dd>
              <dd>- Participated in a study of beach organisms</dd>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">Center for Healing and Neurology</dt>
              <dd>- Transferred patient health information to a new electronic medical record platform</dd>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <dt className="text-uppercase font-italic">Washington Trails Association Volunteer</dt>
              <dd>- Trail maintenance work on Washington State hiking trails</dd>  
            </div>
          </dl>
        </div>
      </div>
    );
  }
}

class SchoolOrganizations extends React.Component{
  render(){
    return(
    <div>
        <h5 className="text-light text-center pb-3">School Organizations</h5>
      
      <div className="container text-light pb-3">
        <dl className="row">
          <div className="col-xs-12 col-sm-12 col-md-4">
            <dt className="text-uppercase font-italic">Association for Computing Machinery (ACM) CSU</dt>
            <dd>- 2016-Present</dd>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            <dt className="text-uppercase font-italic">CSU Outdoor Club</dt>
            <dd>- 2017</dd>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            <dt className="text-uppercase font-italic">CSU Snowriders Club</dt>
            <dd>- 2017</dd>
          </div>
        </dl>
      </div>
    </div>
    );
  }
}

class App extends React.Component{
  render(){
    return(
      <div className="font-weight-light">
        <div className="p-4 container-fluid bg-info">
          <Title />
          <Header />
        </div>
        <div className="p-4 container-fluid bg-dark">
          <PersonalStatement />
          <Education />
          <Skills />
          <WorkExperience />
          <SchoolOrganizations />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));