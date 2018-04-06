import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';

/** Adds the component to select filtered items for
 * database search.
 */
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters : [{ attribute : "type",
                     values  : [ "balloonport","heliport", "airport"] }] };
  }

  static renderCheckbox(value) {
    return <div className="checkbox">
      <label>
        <input type="checkbox" id={value} value={value} onChange={console.log("Fix")}/> {value}
      </label>
    </div>;
  }

  render() {
    let attributes = [];
    for (let index in this.state.filters) {
      if (this.state.filters[index].values.length < 8) {
        attributes.push(<h6 className="text-uppercase">
          {this.state.filters[index].attribute}</h6>);
        for (let value of this.state.filters[index].values) {
          attributes.push(Filter.renderCheckbox(value));
        }
      }
    }
    return(
      <div id="filter">
        <button type="button" className="btn btn-light btn-md">
          <FaFilter/>
        </button>
        {attributes}
      </div>
    )
  }
}

export default Filter;