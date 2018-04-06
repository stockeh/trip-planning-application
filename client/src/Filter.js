import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';
import {Button} from 'reactstrap';

/** Adds the component to select filtered items for
 * database search.
 */
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters : [{ attribute : "type",
                     values  : [ "balloonport","heliport", "airport", "closed"] }] };
    this.buildCheckTable = this.buildCheckTable.bind(this);
  }

  static renderCheckbox(item, attribute) {
    return (
        <pre><label>
          <input type="checkbox" data-valuetwo={attribute}
                 value={item} style={{marginLeft: 15}}
                 onChange={console.log("Fix")}/>
          { item }
        </label></pre>
    );
  }
  buildCheckTable(attribute) {
    let attributes = [];
    attributes.push(<h5 key={attribute} className="text-uppercase"
                        style={{marginLeft: 12}}>
      <u>{attribute}</u></h5>);

    let boxes = this.state.filters[0].values.map((item, index) =>
        <td>{Filter.renderCheckbox(item, index,
            this.state.filters[0])}</td>);
    let rows = [];
    for (let i = 0; i < this.state.filters[0].values.length; ++i) {
      rows.push(<tr key={i}>{boxes[i]}{boxes[++i]}{boxes[++i]}</tr>);
    }
    return {attributes, rows}
  }

  render() {
    let table = null;
    for (let index = 0; index < this.state.filters.length; ++index) {
      for (let index in this.state.filters) {
        let attribute = this.state.filters[index].attribute;
        if (attribute === "type") {
          table = this.buildCheckTable(attribute);
        }
      }
    }
    return(
      <div id="filter">
        <Button className="btn btn-light btn-md">
          <FaFilter/>
        </Button>
        <br/><br/>
        {table.attributes}
        <table className="table-responsive">
          <tbody>{table.rows}</tbody>
        </table>
      </div>
    )
  }
}

export default Filter;