import React, {Component} from 'react';
import './css/headerfooter.css'

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-footer-height row">
        <div className="col-lg-5 col-md-5 col-sm-12 footer-copyright">
          <h4 className="larger-CSUtext-uncap" style={{color: 'white'}}>
            © TripCo - t{this.props.number} {this.props.name} 2018
          </h4>
        </div>
        <div className="col">
          <a href="http://www.colostate.edu/">
            <img className="img-resize" src="../images/CSU-Official-wrdmrk-Rev.png"
                 alt="Colorado State University"/>
          </a>
        </div>
    </div>
    )
  }
}

export default Footer;