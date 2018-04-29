import React, {Component} from 'react';
import FaFilter from 'react-icons/lib/fa/filter';
import FaClose from 'react-icons/lib/fa/close';
import {Button} from 'reactstrap';
import './css/FilterStyle.css';
/** Adds the component to select filtered items for
 * database search.
 */
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayFilter: false,
      initialFilters: [],
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
      let updatedList = this.state.initialFilters;
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
        newFilters.push({value: values[filter], attribute: attribute});
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
    filterer = Filter.spliceArray(filterer,item);

    let original = this.state.initialFilters;
    original = Filter.spliceArray(original, item);
    this.handleFilter(true,item.value,item.attribute);
    this.setState({selectedFilters: filterArr, currentFilters: filterer, initialFilters: original});
  }

  static spliceArray(arr, item){
    for(let i = 0; i < arr.length; i++){
      if(arr[i].value === item.value && arr[i].attribute === item.attribute){
        arr.splice(i,1);
      }
    }
    return arr;
  }

  removeFilter(item) {
      let filterArr = this.state.selectedFilters;
      filterArr = Filter.spliceArray(filterArr,item);

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
                          <Button className="btn-sm filter-button">{item.value}{'  '}
                            <FaClose className="filter-remove" id={item.value} onClick={() =>
                              this.removeFilter(item)} size={12}/></Button></span>
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