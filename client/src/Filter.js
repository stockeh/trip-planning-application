import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';

/* Adds the component to build a custom trip
 * Renders a modal to get input and print
 * out an itinerary of destinations to choose
 * from.
 */
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = { };
  }


  render() {

    return(
      <div id="filter">
        <button type="button" className="btn btn-light btn-md">
          <FaFilter/>
        </button>
      </div>
    )
  }
}

export default Filter;