import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="jumbotron">
          {this.title()}
          <p className="lead">"Want to travel far and wide?"</p>
            <ol >
              <li>
                Search for your favorite destinations and add them to your trip!
              </li>
              <li>
                To plan your trip, choose any options you wish and click plan!</li>
              <li>
                Finally save your trip so you can easily load it again later!</li>
              <li>Already have a trip saved? Simply load it from a file!</li>
            </ol>
        </div>
    )
  }

  title() {
    return( <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3> )
  }
}

export default Header;
