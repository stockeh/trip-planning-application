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
      currentSearch: "",
      showResults: false,
      selectedFilters: [],
      hasBuilt: false
    };
    this.handleFilter = this.handleFilter.bind(this);

    this.filterList = this.filterList.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.buildFilter = this.buildFilter.bind(this);
    this.buildList = this.buildList.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

  }

  handleFilter(filtered, item, attribute) {
    this.props.searchFilter(filtered, item, attribute);
  }

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
    let newFilters = [];
    for (let index = 0; index < this.props.filters.length; ++index) {
      let attribute = this.props.filters[index].attribute;
      let values = this.props.filters[index].values;
      for(let filter = 0; filter < values.length; ++filter){
        newFilters.push({value: values[filter], attribute: attribute})
      }
    }
    if(this.props.filters.length > 0){
      this.setState({initialFilters:newFilters, hasBuilt: true});
    }
  }

  buildList(){
      if(this.state.showResults === true) {
          return(
            <ul className="dropdown" tabIndex="-1" onBlur={this.blur} on={this.blur} onFocus={this.focus}>
              {
                Object.values(this.state.currentFilters).map(function (item) {
                    return <li key={Math.random().toString(36).substring(2,15)}
                               onMouseDown={() => this.addFilter(item)}>{item.value}</li>
                }.bind(this))
              }
            </ul>
          )

      }else{
        return null;
      }
  }

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

  focus () {
    this.setState( { showResults : true } );
  }

  addFilter(item){
    let filterArr = this.state.selectedFilters;
    filterArr.push(item);

    let filterer = this.state.currentFilters;
    for(let i = 0; i < filterer.length; i++){
      if(filterer[i].value === item.value && filterer[i].attribute === item.attribute){
        filterer.splice(i,1);
      }
    }

    let original = this.state.initialFilters;
    for(let i = 0; i < original.length; i++){
        if(original[i].value === item.value && original[i].attribute === item.attribute){
            original.splice(i,1);
        }
    }
    this.handleFilter(true,item.value,item.attribute);
    this.setState({selectedFilters: filterArr, currentFilters: filterer, initialFilters: original});
  }

  removeFilter(item) {
      // let filter = event.target.id;
      let filterArr = this.state.selectedFilters;
      for (let i = 0; i < filterArr.length; i++) {
          if (filterArr[i].value === item.value && filterArr[i].attribute === item.attribute) {
              filterArr.splice(i, 1);
          }
      }

      let original = this.state.initialFilters;
      original.push(item);

      this.handleFilter(false,item.value,item.attribute);
      this.setState({selectedFilters: filterArr, initialFilters: original});

  }

  renderRow(){
    return(
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
                          <button type="button" className="btn-sm filter-button">{item.value}{'  '}
                            <FaClose className="filter-remove" id={item.value} onClick={() =>
                              this.removeFilter(item)} size={12}/></button></span>
            }.bind(this))
          }
        </div>
      </div>
    )
  }

  render() {
      if(!this.state.hasBuilt){
        this.buildFilter();
      }
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
            {this.renderRow()}
          </div>

        </div>
      );
  }
}

export default Filter;