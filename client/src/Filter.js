import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';
import {Button} from 'reactstrap';
// import DropdownInput from 'react-dropdown-input';
import './css/FilterStyle.css';
/** Adds the component to select filtered items for
 * database search.
 */
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayFilter: false,
      initialItems: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Bacon",
        "Eggs",
        "Salmon",
        "Granola",
        "Bananas",
        "Beer",
        "Wine",
        "Yogurt"
      ],
      item: "",
      items: [],
      showResults: false,
      testFilters: []
    };
    this.buildCheckTable = this.buildCheckTable.bind(this);
    this.renderFilter = this.renderFilter.bind(this);

    this.handelFilter = this.handelFilter.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);

    this.filterList = this.filterList.bind(this);
    this.list = this.list.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.addFilter = this.addFilter.bind(this);
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

  filterList(event) {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function (item) {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  renderFilter() {
    let table = null;
    for (let index = 0; index < this.props.filters.length; ++index) {
      let attribute = this.props.filters[index].attribute;
      if (attribute.toLocaleLowerCase() === "type") {
        table = this.buildCheckTable(attribute, index);
      }
    }
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

  list(){

    if(this.state.showResults === true) {
    return(
         <ul className="dropdown">
           {
             Object.values(this.state.items).map(function (item) {
               return <li key={item} onClick={() => this.addFilter(item)}>{item}</li>
             }.bind(this))
           }
        </ul>
    )

    }else return(null)
  }

  blur(){
    this.setState({showResults: false});
  }

  focus(){
    this.setState({showResults: true});
  }

  addFilter(item){
    console.log("test");
    let arr = this.state.testFilters;
    arr.push(item);
    this.setState({testFilters: arr});
    //   return <button type="button" className="btn btn-outline-secondary">{item}</button>
    // })
  }

  render() {
      console.log("Items: " + this.state.items);
      console.log(this.state.testFilters);
      const showHide = {
        'display': this.state.displayFilter ? 'block' : 'none'
      };
      const showReplyForm = () => {
        this.setState({displayFilter: !this.state.displayFilter});
      };
      return (
        <div id="filter">
          <Button className="btn btn-light btn-md"
                  onClick={showReplyForm}>
            <FaFilter/>
          </Button>
          <div id="filter-content" style={showHide}>
            {/*{this.renderFilter()}*/}
            {/*<DropdownInput options={this.state.initialItems}*/}
                           {/*menuClassName='dropdown-input'*/}
                           {/*// onSelect={this.handleSearchFilter}*/}
                           {/*placeholder='Search...'/>*/}
            <div className="filter-list">
              <div className="input-group filter-input-group">
                {
                  Object.values(this.state.testFilters).map(function (item) {
                    return <span className="input-group-addon">
                      <button type="button" className="btn btn-sm btn-outline-secondary filter">{item}</button></span>
                  }.bind(this))
                }
                <div>
                  <input type="text" className="filter-box" placeholder="Search" onChange={this.filterList}
                       onFocus={this.focus}/>
                  {this.list()}
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    // }
  }
}

export default Filter;