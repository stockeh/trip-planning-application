import React, {Component} from 'react';
import Search from './Search';
import Filter from './Filter';
import { InputGroup, Input, Button } from 'reactstrap';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';
import { gold_btn, gold_hvr, canyon_btn, canyon_hvr } from './css/styling.css';

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
        filters : []
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
    this.modalFooter = this.modalFooter.bind(this);
  }

  newFilter(val, attr){
    let newArray = this.state.filters.slice();
    newArray.push({attribute: attr, values: [val]});
    this.setState( {filters : newArray} );
  }

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
    return(
        <div>
          <a key={item.name} className="text-info font-weight-light"
              style={{cursor:'pointer'}}
              onClick={() => {
                  this.updateDestinations(index, 1);
              }}>{' '}<small><MdAddCircleOutline size={16}/></small></a>
          {item.name}
          <div>{' '}<small>{item.country}</small></div>
      </div>
    );
      // let destinationName = [<row>];
      // destinationName.push(<col className="col-10">{item.name}</col>);
      // console.log("check for country attribute: " + item.country);
      // destinationName.push(<col className="col-2"><a key={item.name} className="text-info font-weight-light"
      //                                                style={{cursor:'pointer'}}
      //                                                onClick={() => {
      //                                                    this.updateDestinations(index, 1);
      //                                                }}>{' '}<small><MdAddCircleOutline size={16}/></small></a></col>);
      // destinationName.push(<small>{item.country}</small>);
      // destinationName.push(</row>);
      // return destinationName;
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

  modalContent() {
    let footer = this.modalFooter();
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="searchModalLabel">Build a Custom Trip!</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <Filter query={this.state.query} filters={this.props.config.filters}
                    searchFilter={this.searchFilter}/> <br/>
          <InputGroup>
            <Input onChange={(e)=>this.updateData(e.target.value, "query")}
                   placeholder="Search Destinations..."/>
            <Search query={this.state.query} filters={this.state.filters}
                    updateData={this.updateData}/>
          </InputGroup>
          <br/> {this.createTable()}
        </div>
          {footer}
      </div>
    )
  }

  render() {
    console.log("Query Filters\n|-- line 177 --|\nFilter:\n"
        + JSON.stringify(this.state.filters, null, 2));
    return(
      <div id="query">
        <Button id="lookUp" className="green_btn green_hvr" data-toggle="modal" data-target="#customSearchModal">Look Up</Button>

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