import React, {Component} from 'react';
import './css/StaffPage.css';
import './images/bitmoji_superhero_Evan.png';
import './images/Brian_Frisbee_Bitmoji.png';
import './images/Jason_Mathmoji.png';

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
            - Some link to resume here -
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
            ...
          </p>
        </div>
      </div>
    </div>
    );
  }

  static BrianCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-brian ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="images/Brian_Frisbee_Bitmoji.png"/>
        </div>
        <div className="col-md-12 section2">
          <p>Brian Martin</p><br/>
          <h1>...</h1>
        </div>
        <div className="col-md-12 section3">
          <p>
            ...
          </p>
        </div>
      </div>
    </div>
    );
  }

  static AlexCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-alex ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src=""/>
        </div>
        <div className="col-md-12 section2">
          <p>Alex Segura</p><br/>
          <h1>...</h1>
        </div>
        <div className="col-md-12 section3">
          <p>
            ...
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
