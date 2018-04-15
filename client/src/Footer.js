import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-header-height">

        <h4 style={{color: 'white'}}>© TripCo t{this.props.number} {this.props.name} 2018</h4>

        <a href="http://www.colostate.edu/">
          <img src="../resources/signature-oneline.svg"
               alt="Colorado State University" style={{width: 350, height: 58}}/>
        </a>
      </div>
    )
  }
}

export default Footer;