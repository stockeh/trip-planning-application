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
                     values  : [ "testplace 1", "testplace 2",
                                 "testplace 3", "testplace 4",
                                 "testplace 5"] }],
      buttonClick: false
    };
    this.buildCheckTable = this.buildCheckTable.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.openFilter = this.openFilter.bind(this);
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

  buildCheckTable(attribute, index) {
    let attributes = [];
    attributes.push(<h6 key={attribute} className="text-uppercase"
                        style={{marginLeft: 12}}>
                    <u>{attribute}</u></h6>);

    let boxes = this.state.filters[index].values.map((item, index) =>
        <td>{Filter.renderCheckbox(item, index,
            this.state.filters[index])}</td>);
    let rows = [];
    for (let i = 0; i < this.state.filters[index].values.length; ++i) {
      rows.push(<tr key={i}>{boxes[i]}{boxes[++i]}{boxes[++i]}</tr>);
    }
    return {attributes, rows}
  }

  openFilter() {
    this.setState({buttonClick : !this.state.buttonClick});
  }

  renderFilter() {
    let table = null;
    for (let index = 0; index < this.state.filters.length; ++index) {
      for (let index in this.state.filters) {
        let attribute = this.state.filters[index].attribute;
        if (attribute === "type") {
          table = this.buildCheckTable(attribute, index);
        }
      }
    }
    if (this.state.buttonClick === true) {
      return (
          <div>
            <br/><h5>Filterable Options</h5>
            {table.attributes}
            <table className="table-responsive">
              <tbody>{table.rows}</tbody>
            </table>
          </div>
      );
    }
  }

  render() {
    return(
      <div id="filter">
        <Button className="btn btn-light btn-md" onClick={() => this.openFilter()}>
          <FaFilter/>
        </Button>
        {this.renderFilter()}
      </div>
    )
  }
}

export default Filter;