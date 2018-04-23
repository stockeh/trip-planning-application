import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';
import FaClose from 'react-icons/lib/fa/close';
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
      initialFilters: [{attribute:"country",value:"USA"},{attribute:"country",value:"Canada"},{attribute:"country",value:"China"},{attribute:"country",value:"Iceland"},{attribute:"country",value:"Mexico"}],
      currentFilters: [],
      // initialItems: [
      //   "Apples",
      //   "Broccoli",
      //   "Chicken",
      //   "Bacon",
      //   "Eggs",
      //   "Salmon",
      //   "Granola",
      //   "Bananas",
      //   "Beer",
      //   "Wine",
      //   "Yogurt"
      // ],
      currentSearch: "",
      showResults: false,
      selectedFilters: []
    };
    // this.buildCheckTable = this.buildCheckTable.bind(this);
    // this.renderFilter = this.renderFilter.bind(this);

    // this.handelFilter = this.handelFilter.bind(this);
    // this.renderCheckbox = this.renderCheckbox.bind(this);

    this.filterList = this.filterList.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.updateFilter = this.updateFilter.bind(this);
    this.buildFilter = this.buildFilter.bind(this);
    this.buildList = this.buildList.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

  }

  // handelFilter(e, item, attribute) {
  //   this.props.searchFilter(e.target.checked, item, attribute);
  // }

  // renderCheckbox(item, attribute) {
  //   return (
  //       <pre><label>
  //         <input type="checkbox" style={{marginLeft: 15}}
  //                onClick={(e)=>this.handelFilter(e, item, attribute)}/> { item }
  //       </label></pre>
  //   );
  // }

  // buildCheckTable(attribute, index) {
  //   let attributes = [];
  //   attributes.push(<h6 key={attribute} className="text-uppercase"
  //                       style={{marginLeft: 12}}>
  //                   <u>{attribute}</u></h6>);
  //
  //   let boxes = this.props.filters[index].values.map((item, index) =>
  //       <td>{this.renderCheckbox(item, attribute)}</td>);
  //   let rows = [];
  //   for (let i = 0; i < this.props.filters[index].values.length; ++i) {
  //     rows.push(<tr key={i}>{boxes[i]}{boxes[++i]}{boxes[++i]}</tr>);
  //   }
  //   return {attributes, rows}
  // }

  updateFilter(value){
      var updatedList = this.state.initialFilters;
      updatedList = updatedList.filter(function (item) {
          return item.value.toLowerCase().search(
              value.toLowerCase()) !== -1;});
      return updatedList;
  }

  filterList(event) {
    let updatedList = this.updateFilter(event.target.value);
    this.setState({currentFilters: updatedList, currentSearch: event.target.value});
  }

  buildFilter() {
      for (let index = 0; index < this.props.filters.length; ++index) {
        let attribute = this.props.filters[index].attribute;
        let values = this.props.filters[index].values;
        let newFilters = [];
        for(let filter = 0; filter < values.length; ++filter){
          newFilters.push({value: values[filter], attribute: attribute})
        }
        console.log("Filters: " + newFilters);
        this.setState({initialFilters:newFilters});
      }
  }

  buildList(){
      if(this.state.showResults === true) {
          return(
              <ul className="dropdown" tabIndex="-1" onBlur={this.blur} on={this.blur} onFocus={this.focus}>
                  {
                      Object.values(this.state.currentFilters).map(function (item) {
                          return <li key={item.value} onClick={() => this.addFilter(item)}>{item.value}</li>
                      }.bind(this))
                  }
              </ul>
          )

      }else return(null)
  }

  // renderFilter() {
  //   let table = null;
  //   for (let index = 0; index < this.props.filters.length; ++index) {
  //     let attribute = this.props.filters[index].attribute;
  //     if (attribute.toLocaleLowerCase() === "type") {
  //       table = this.buildCheckTable(attribute, index);
  //     }
  //   }
  //   return (
  //     <div>
  //       <br/><h5>Filterable Options</h5>
  //       {table.attributes}
  //       <table className="table-responsive">
  //         <tbody>{table.rows}</tbody>
  //       </table>
  //     </div>
  //   );
  // }

  componentWillMount() {
      this.buildFilter();
      document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e){
    if(!this.node.contains(e.target)) {

      this.blur();
    }
  }

  blur(){
    this.setState({showResults: false});
  }

  focus(){
    this.setState({showResults: true});
  }

  addFilter(item){
    console.log("test");
    let filterArr = this.state.selectedFilters;
    filterArr.push(item);

    let filterer = this.state.currentFilters;
    for(let i = 0; i < filterer.length; i++){
      if(filterer[i].value === item.value){
        filterer.splice(i,1);
      }
    }

    let original = this.state.initialFilters;
    for(let i = 0; i < original.length; i++){
        if(original[i].value === item.value){
            original.splice(i,1);
        }
    }
    this.setState({selectedFilters: filterArr, currentFilters: filterer, initialFilters: original});
  }

  removeFilter(item) {
      // let filter = event.target.id;
      console.log(item + " " + item.attribute + " " + item.value);
      let filterArr = this.state.selectedFilters;
      for (let i = 0; i < filterArr.length; i++) {
          if (filterArr[i].value === item.value) {
              filterArr.splice(i, 1);
          }
      }


      let original = this.state.initialFilters;
      original.push(item);

      // let updatedList = original;
      // updatedList = updatedList.filter(function (item) {
      //     return item.value.toLowerCase().search(
      //         value.toLowerCase()) !== -1;});
      this.setState({selectedFilters: filterArr, initialFilters: original});

  }


  render() {
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
            <div className="row pt-3">
              <div className="col filter-list">
                <div ref={node => this.node = node} className="input-group">
                  <div>
                    <input type="text" className="" placeholder="Filter by..." onChange={this.filterList}
                         onFocus={this.focus}/>
                    {this.buildList()}
                  </div>
                </div>
              </div>
              <div className="col">
                  {
                      Object.values(this.state.selectedFilters).map(function (item) {
                          return <span className="input-group-addon">
                        <button type="button" className="btn btn-sm btn-outline-secondary">{item.value}{'  '}<FaClose className="filter-remove" id={item.value} onClick={() => this.removeFilter(item)} size={12}/></button></span>
                      }.bind(this))
                  }
              </div>
            </div>
          </div>

        </div>
      );
    // }
  }
}

export default Filter;