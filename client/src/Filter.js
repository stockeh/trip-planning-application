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
      buttonClick: false
    };
    this.buildCheckTable = this.buildCheckTable.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.openFilter = this.openFilter.bind(this);

    this.handelFilter = this.handelFilter.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }

  handelFilter(e, item, attribute) {
    this.props.searchFilter(e.target.checked, item, attribute);
  }

  renderCheckbox(item, attribute) {
    return (
        <pre><label>
          <input type="checkbox" style={{marginLeft: 15}}
                 onClick={(e)=>this.handelFilter(e, item, attribute)}/> { item }
        </label></pre>
    );
  }

  buildCheckTable(attribute, index) {
    let attributes = [];
    attributes.push(<h6 key={attribute} className="text-uppercase"
                        style={{marginLeft: 12}}>
                    <u>{attribute}</u></h6>);

    let boxes = this.props.filters[index].values.map((item, index) =>
        <td>{this.renderCheckbox(item, attribute)}</td>);
    let rows = [];
    for (let i = 0; i < this.props.filters[index].values.length; ++i) {
      rows.push(<tr key={i}>{boxes[i]}{boxes[++i]}{boxes[++i]}</tr>);
    }
    return {attributes, rows}
  }

  openFilter() {
    this.setState({buttonClick : !this.state.buttonClick});
  }

  renderFilter() {
    let table = null;
    for (let index = 0; index < this.props.filters.length; ++index) {
      for (let index in this.props.filters) {
        let attribute = this.props.filters[index].attribute;
        if (attribute.toLocaleLowerCase() === "type") {
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
    if (this.props.filters.length > 0) {
      return (
        <div id="filter">
          <Button className="btn btn-light btn-md"
                  onClick={() => this.openFilter()}>
            <FaFilter/>
          </Button>
          {this.renderFilter()}
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Filter;