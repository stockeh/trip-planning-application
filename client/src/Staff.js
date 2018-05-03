import React, {Component} from 'react';
import './css/StaffPage.css';
import './images/bitmoji_superhero_Evan.png';
import './images/Brian_Frisbee_Bitmoji.png';
import './images/Jason_Mathmoji.png';
import './images/alexBitmoji.png';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';

class Staff extends Component {

  static JasonCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-jason ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="images/Jason_Mathmoji.png"/>
        </div>
        <div className="col-md-12 section2">
          <p>Jason Stock</p><br/>
          <h1>B.S. Computer Science and Mathematics</h1><br/>
        </div>
        <div className="col-md-12 section3">
          <p>
            Try to make sense of what you see and wonder about what makes the universe exist.
            Be curious. - Stephen Hawking
          </p>
        </div>
        <div className="col-md-12 section3">
          <p>
              <a href="https://www.linkedin.com/in/jason-stock/" target="_blank"><FaLinkedinSquare size={35} /></a>
          </p>
        </div>
      </div>
    </div>
    );
  }

  static EvanCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="images/bitmoji_superhero_Evan.png"/>
        </div>
        <div className="col-md-12 section2">
          <p>Evan Steiner</p><br/>
          <h1>B.S. Computer Science and Mathematics</h1><br/>
        </div>
        <div className="col-md-12 section3">
          <p>
            "Courage doesn't always roar. Sometimes courage is a quiet voice at the end of
            the day saying, 'I will try again tomorrow.'" -Mary Anne Radmacher
          </p>
            <div className="col-md-12 section3">
                <p>
                    <a href="https://www.linkedin.com/in/evan-steiner/" target="_blank"><FaLinkedinSquare size={35} /></a>
                </p>
            </div>
        </div>
      </div>
    </div>
    );
  }

  static BrianCard() {
    const quote = "Don't give up on your dreams. Keep sleeping.";
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-brian ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="images/Brian_Frisbee_Bitmoji.png"/>
        </div>
        <div className="col-md-12 section2">
          <p>Brian Martin</p><br/>
            <h1><span>B.S. Computer Science<br/></span><br/></h1>
        </div>
          <div className="col-md-12 section3">
              <p>
                  {quote}
              </p>
          </div>
        <div className="col-md-12 section3">
          <p>
              <a href="https://www.linkedin.com/in/brianlmart/" target="_blank"><FaLinkedinSquare size={35} /></a>
          </p>
        </div>
      </div>
    </div>
    );
  }

  static AlexCard() {
    const quote="No Quote Needed"
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-alex ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="images/alexBitmoji.png"/>
        </div>
        <div className="col-md-12 section2">
          <p>Alex Segura</p><br/>
          <h1><span>B.S. Computer Engineering<br/></span><br/></h1>
        </div>
          <div className="col-md-12 section3">
              <p>
                  {quote}
              </p>
          </div>
        <div className="col-md-12 section3">
          <p>
              <a href="https://www.linkedin.com/in/alexsegura64/" target="_blank"><FaLinkedinSquare size={35} /></a>
          </p>
        </div>
      </div>
    </div>
    );
  }

  render() {
    return(
      <div className="container section-ourTeam">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 ourTeam-hedding text-center">
            <h1>Meet Our Team</h1>
          </div>
        </div>
        <div className="row">
          {Staff.JasonCard()}
          {Staff.EvanCard()}
          {Staff.BrianCard()}
          {Staff.AlexCard()}
        </div>
      </div>
    );
  }
}

export default Staff;
