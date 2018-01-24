class Header extends React.Component{
  render() {
    return (
      <div className="container">
        <h1 className="display-3">Jason Stock</h1>
        <hr/>
        <p>(720) 319-9545 | <a href="mailto:jason12stock@gmail.com">jason12stock@gmail.com</a> |
        <a href="https://www.linkedin.com/in/jason-stock/"> LinkedIn</a>
        </p>
      </div>
    )
  }
}

class Statement extends React.Component {
  render() {
    return (
      <div>
        <u>
        <h4>Personal Statement</h4>
        </u>
        <p>Third year college student that is motivated, resourceful, with strong work ethic seeking employment opportunities.  Very sociable and outgoing individual, that jumps at every opportunity to gain knowledge.  Extensive experience with computer technologies and programming languages.</p>
      </div>
    )
  }
}

class Education extends React.Component {
  render() {
    return (
      <div>
        <u>
          <h4>Education</h4>
        </u>
        <p>Colorado State University, Fort Collins, CO<br/>B.S. in <b>Computer Science</b>, with minor in <b>Mathematics</b> - GPA: 3.45</p>
      </div>
    )
  }
}

class SkillSummary extends React.Component {
  render() {
    return (
      <div>
        <u>
        <h4>Skill Summary</h4>
        </u>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Programming languages; C++, C, Java, Python, Assembly</li>
              <li>Strong problem-solving skills with the ability to multitask</li>
              <li>Highly efficient, organized, with the ability to collaborate with others</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>Operating Systems; Windows and Linux</li>
              <li>Proven reliable with excellent attendance record</li>
              <li>Projects; Autonomous/Remote Rover, Search Engine, Scheduler, Password Manager, Glitch and Art Imaging Software</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class Experience extends React.Component {
  render() {
    return (
      <div>
        <u>
          <h4>Experience</h4>
        </u>
        <h6>Computer Science Teaching Assistant</h6>
        <ul>
          <li>Work with students studying Computer Science. Specifically, Computer Organization and Architecture</li>
          <li>Course concepts include C programming, assembly programming, LC3 microarchitecture, digital logic and gates</li>
          <li>Facilitate recitations and reinforce understanding of course material</li>
          <li>Responsible for developing a microarchitecture and data path assignment for students</li>
          <li>Develop new strengths upon assessing students’ understanding</li>
        </ul>
          <h6>Student Manager</h6>
        <ul>
          <li>Exhibit leadership and managerial skills through the responsibilities of scheduling shifts, conduct trainings and
         supervising up to 17 employees
      </li>
          <li>Attend weekly meetings with upper management regarding store and employee performance to maintain goal
         achievement and improvement
      </li>
          <li>Select candidates, conduct interviews, and train new employees</li>
        </ul>
        <h6>President of Photography at Colorado State</h6>
        <ul>
          <li>Established the Photography Club to an active and successful student organization</li>
          <li>Organize meetings and present opportunities and events for 300+ members</li>
          <li>Manage club operations and handle member’s questions and concerns</li>
        </ul>
        <h6>Technology Student Alliance</h6>
        <ul>
          <li>Project manager, joint effort towards software development and problem solving</li>
          <li>Utilized Java to work out various projects and debug software</li>
          <li>Worked with a team of students to enhance communicative and problem-solving skills</li>
        </ul>
      </div>
    )
  }
}

class Awards extends React.Component {
  render() {
    return (
      <div>
        <u>
          <h4>Volunteer Experience, Awards, and Involvement</h4>
        </u>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Leadership Preparation Certificate</li>
              <li>Association for Computer Machinery</li>
              <li>Hashdump Security Club</li>
              <li>Food Safety and Sanitation – Level II</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>Dean’s List (4.0/4.0) – Spring & Fall, 2017</li>
              <li>50+ hours of volunteer experience (Tri Elks Lodge, Ronald McDonald House, Community Cycles, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <Header />
        </div>
        <div className="container">
          <Statement />
          <Education />
          <SkillSummary />
          <Experience />
          <Awards />
        </div>
       </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
