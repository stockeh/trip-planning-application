import React, {Component} from 'react';
import './css/headerfooter.css';
require('./images/signature-oneline.svg');
require('./images/signature-stacked.svg');
require('./images/signature-mobile.svg');

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="add-header-height">
        <div id="responsiveHeaderContainer" className="">

          <a href="http://colostate.edu" id="csuHeaderLink">
            <img id="csuLargeLogo" src="./images/signature-oneline.svg" width="350" height="45" alt="Colorado State University"/>
              <img id="csuMedLogo" src="./images/signature-stacked.svg" width="172" height="45" alt="Colorado State University"/>
                <img id="csuSmallLogo" src="./images/signature-mobile.svg" width="113" height="45" alt="Colorado State University"/>
          </a>

          <div id="responsiveLogoSubsystem">
            <a href="https://www.natsci.colostate.edu/" id="cnsHeaderLink" title="">
              <h1 id="cnsHeaderText" className="larger-CSUtext">
                <span>COLLEGE OF</span> <span >NATURAL SCIENCES</span>
              </h1>
            </a>
          </div>
        </div>
      </div>
    )
  }

  title() {
    return( <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3> )
  }
}

export default Header;
