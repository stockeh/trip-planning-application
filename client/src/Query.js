import React, {Component} from 'react';
import Search from './Search';
import Filter from './Filter';
import { InputGroup, Input, Button, Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';
import { gold_btn, gold_hvr, canyon_btn, canyon_hvr, add_logo, query_country} from './css/styling.css';
import ReactTooltip from 'react-tooltip'

/* Adds the component to build a custom trip
 * Renders a modal to get input and print
 * out an itinerary of destinations to choose
 * from.
 */
class Query extends Component {
  constructor(props){
    super(props);
    this.state = {
        query : "",
        places: [],
        filters : [],
        limit : 50,
        dropdownOpen: false
    };

    this.updateData = this.updateData.bind(this);
    this.updateDestinations = this.updateDestinations.bind(this);

    this.createDestination = this.createDestination.bind(this);
    this.createTable = this.createTable.bind(this);

    this.searchFilter = this.searchFilter.bind(this);
    this.newFilter = this.newFilter.bind(this);
    this.mutateValue = this.mutateValue.bind(this);
    this.mutateFilter = this.mutateFilter.bind(this);

    this.modalContent = this.modalContent.bind(this);
    this.modalSearchLimit = this.modalSearchLimit.bind(this);
    this.modalFooter = this.modalFooter.bind(this);
  }

  newFilter(val, attr){
    let newArray = this.state.filters.slice();
    newArray.push({attribute: attr, values: [val]});
    this.setState( {filters : newArray} );
  }
InputGroup
  mutateValue(checked, val, index) {
    let newFilter = Object.assign([], this.state.filters);
    if (checked) {
      newFilter[index].values.push(val);
    }
    else {
      newFilter[index].values =
          newFilter[index].values.filter(function(e) { return e !== val });
      if (newFilter[index].values.length === 0) {
        newFilter.splice(index, 1);
      }
    }
    this.setState({filters : newFilter});
  }

  mutateFilter(checked, val, attr) {
    let notAdded = true;
    for (let index in this.state.filters) {
      if (this.state.filters[index].attribute === attr) {
        notAdded = false;
        this.mutateValue(checked, val, index);
        break;
      }
    }
    if (notAdded) {
      this.newFilter(val, attr);
    }
  }

  searchFilter(checked, val, attr) {
    if (this.state.filters.length > 0) {
      this.mutateFilter(checked, val, attr);
    }
    else if (checked) {
      this.newFilter(val, attr);
    }
  }

  updateData(data, obj) {
    this.setState({[obj]: data});
  }

  updateDestinations(index, numElements) {
    let newPlaces = this.state.places;
    let removedItem = newPlaces.splice(index, numElements);
    for (let i = 0; i < numElements; ++i)
      this.props.updatePlaces(removedItem[i]);
    this.setState({places: newPlaces});
  }

  createDestination(item, index) {
    let information = this.props.placeInformation(item);
    return(
        <div>
          <a key={item.name} style={{cursor:'pointer'}}
              onClick={() => {
                  this.updateDestinations(index, 1);
              }}>{' '}<small><MdAddCircleOutline className = "add_logo" size={25} data-tip="Add to trip" data-for="add"/></small><ReactTooltip id="add" place="top" effect="solid"/></a>
          {item.name}
          <div><small className="font-weight-light query_country">
              {information.regionName}{information.countryName}
          </small></div>
      </div>
    );
  }

  createTable() {
    let dest = this.state.places.map((item, index) => {
        return <td>{this.createDestination(item, index)}</td>;
    });
    let table = [];
    for (let i = 0; i < dest.length; ++i) {
        table.push(<tr key={i}>{ dest[i] }</tr>);
    }
    if (this.state.places.length > 0) {
      return (
        <table className="table table-responsive table-hover">
          <thead>
            <tr><th className="bg_csu_gold align-middle" scope="col">Destinations</th></tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
      );
    }
  }

  modalFooter() {
    let size = this.state.places.length;
    let visible = true;

    if (document.getElementById("button-grouping") !== null) {
      if (size > 0)
        visible = false;
      let allChildNodes = document.getElementById("button-grouping").getElementsByTagName('*');
      for (let i = 0; i < allChildNodes.length; ++i) {
        allChildNodes[i].disabled = visible;
      }
    }

    return (
      <div className="modal-footer">
        <div className="justify-content-between" id="button-grouping">
            <Button id="add-all" size="sm" className="gold_btn gold_hvr"
                    onClick={()=>this.updateDestinations(0, size)}>Add All</Button>{' '}
            <Button id="clear" size="sm" className="canyon_btn canyon_hvr"
                    onClick={()=>this.updateData([], "places")}>Clear</Button>
        </div>
      </div>
    )
  }

  modalSearchLimit() {

    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.updateData(!this.state.dropdownOpen, "dropdownOpen")}>
            <DropdownToggle caret>
                {this.state.limit}
            </DropdownToggle>
            <DropdownMenu>
                <div>10</div>
                <div>25</div>
                <div>50</div>
            </DropdownMenu>
        </Dropdown>
    )
  }

  modalContent() {
    let footer = this.modalFooter();
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title larger-CSUtext" id="searchModalLabel">Build a Custom Trip!</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <Filter query={this.state.query} filters={this.props.config.filters}
                    searchFilter={this.searchFilter}/> <br/>
          <InputGroup>
            <Input onChange={(e)=>this.updateData(e.target.value, "query")}
                   placeholder="Search For Destinations..."/>
            <Search query={this.state.query} filters={this.state.filters}
                    host={this.props.host} updateData={this.updateData}/>
          </InputGroup>
            {this.modalSearchLimit()}
          <br/> {this.createTable()}
        </div>
          {footer}
      </div>
    )
  }

  render() {
    // console.log("Query Filters\n|-- line 177 --|\nFilter:\n"
    //     + JSON.stringify(this.state.filters, null, 2));
    return(
      <div id="query">
        <Button id="lookUp" className="green_btn green_hvr" data-toggle="modal" data-target="#customSearchModal">Search</Button>

        <div className="modal fade" id="customSearchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            {this.modalContent()}
          </div>
        </div>

      </div>
    )
  }
}

export default Query;