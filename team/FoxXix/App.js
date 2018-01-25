class Header extends React.Component{
  render() {
    return (
      <div className="container">
          <h1 className="mb-0 display-2">Brian
            <span className="text-secondary display-2">Martin</span>
          </h1>
          <p>I am a student at Colorado State University studying Computer Science. My goal is to learn as much as possible and become a great software developer.</p>
      </div>
    )
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p className="text-left lead">BrianLMart@gmail.com</p>
          </div>
          <div className="col-md-4">
            <p className="text-center lead">(970) 402-8994</p>
          </div>
          <div className="col-md-4">
            <p className="text-right lead">4226 Lookout Lane <br/> Fort Collins, CO 80526</p>
          </div>
        </div>
      </div>
    )
  }
}

class Education extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="display-5">EDUCATION</h2>
        <div className="row">
          <div className="col-md-6">
            <h5>Computer Science<span className="text-secondary lead">, Colorado State University</span></h5>
            <p>Coursework: Computer Securtiy, Big Data, Software Development</p>
            <p>Anticipated completion: Dec 2018</p>
          </div>
          <div className="col-md-6">
            <h5>CIS<span className="text-secondary lead">, Front Range Community College</span></h5>
            <p>Associate of Applied Science in Computer Information Systems</p>
            <p>Certificates in Programming, Network+, and Computer Technician A+</p>
          </div>
        </div>
      </div>
    )
  }
}

class Experience extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="display-5">EXPERIENCE</h2>
        <div className="job">
          <div className="job_data">
            <h3 className="display-7 text-center"><a href="http://travelport.com/">Travelport</a></h3>
            <div className="row lead">
               <div className="col-md-4">
                <p className="text-center">Software Development Intern</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">May 2017 - August 2017</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">Centennial, CO</p>
              </div>             
            </div>
            <hr/>
            <div className="row">
                  <div className="col-md-4">
                    <p className="text-center">Worked with the Trip Search API team to discover errors from incoming requests and created meaningful responses</p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-center">Created a Java web service using Maven to find errors in requests coming into the Trip Search API</p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-center">Successfully worked in an Agile development team with Jira, and deployment tools such as Jenkins and Stackato</p>
                  </div>
            </div>
          </div>
        </div>

        <div className="job">
          <div className="job_data">
            <h3 className="text-center">RADD Web Studio</h3>
            <div className="row lead">
              <div className="col-md-4">
                <p className="text-center">Web Developer</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">June 2015 - August 2016</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">Fort Collins, CO</p>
              </div>             
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-12">
                <p className="text-center">Using Wordpress, I updated existing web sites and created new websites mainly with PHP and JQuery</p>
              </div>
            </div>
          </div>
        </div>

        <div className="job">
          <div className="job_data">
            <h3 className="text-center"><a href="http://medinformatix.com/">Medinformatix</a></h3>
            <div className="row lead">
              <div className="col-md-4">
                <p className="text-center">Integration Engineer</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">February 2014 - May 2015</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">Los Angeles, CA</p>
              </div>             
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-4">
                <p className="text-center">Constructed and helped upkeep custom interfaces between organizations that transfer patient medical data through HL7 messages</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">Oversaw lab interfaces, developing small applications that are used to perform custom and unique tasks to the customer’s specifications</p>
              </div>
              <div className="col-md-4">
                <p className="text-center">Solved issues dealing with interfaces and created modifications that were requested in a timely manner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Skills extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="display-5">SKILLS, TECHNOLOGIES &amp; PROJECTS</h2>
        <ul>
          <li>C++, C#, Java, Microsoft SQL Server, Visual Basic, JavaScript/jQuery , CSS, PHP and Ruby</li>
          <li>Member of the National Technical Honor Society (NTHS) since 2008</li>
          <li>Created several Android applications for personal interest using the Android Development Kit</li>
        </ul>
      </div>
      )
  }
}

class Footer extends React.Component {
  render() {
    return(
      <footer className="container">
        <p className="text-right">References available upon request</p>
      </footer>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <Header />
        </div>  
        <Contact />
        <hr/>
        <Education />  
        <hr/>
        <Experience />
        <hr/>
        <Skills />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));