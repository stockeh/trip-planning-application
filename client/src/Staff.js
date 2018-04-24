import React, {Component} from 'react';
import './css/StaffPage.css'

class Staff extends Component {

  static JasonCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src=""/>
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
      <div className="row section-evan ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src=""/>
        </div>
        <div className="col-md-12 section2">
          <p>...</p><br/>
          <h1>...</h1><br/>
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

  static BrainCard() {
    return (
      <div className="col-md-3 col-sm-3 col-xs-12">
      <div className="row section-brian ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src=""/>
        </div>
        <div className="col-md-12 section2">
          <p>...</p><br/>
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
          <p>...</p><br/>
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
          {Staff.BrainCard()}
          {Staff.AlexCard()}
        </div>
      </div>
    );
  }
}

export default Staff;
