import React, {Component} from 'react';
import './css/headerfooter.css'
require('./images/CSU-Official-wrdmrk-Rev.png');

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-footer row no-gutters" style={{ margin: 0, padding: 0 }}>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <h4 className="larger-CSUtext-uncap footer-copyright" style={{color: 'white'}}>
            © TripCo - t{this.props.number} {this.props.name} 2018
          </h4>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <a href="http://www.colostate.edu/">
            <img className="img-resize" src="./images/CSU-Official-wrdmrk-Rev.png"
                 alt="Colorado State University"/>
          </a>
        </div>
    </div>
    )
  }
}

export default Footer;