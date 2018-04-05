import React, {Component} from 'react';
import Search from './Search';
import Filter from './Filter';

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
        filters : [{ attribute : "",
                       values  : [] }]
    };
    this.updateData = this.updateData.bind(this);
    this.updateDestinations = this.updateDestinations.bind(this);

    this.createDestination = this.createDestination.bind(this);
    this.createTable = this.createTable.bind(this);

    this.modalContent = this.modalContent.bind(this);
    this.modalFooter = this.modalFooter.bind(this);
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
    let destinationName = [item.name];
    destinationName.push(<a key={item.name} className="text-info font-weight-light"
                            style={{cursor:'pointer'}}
                            onClick={() => {
                              this.updateDestinations(index, 1);
                              }}><br/><small>Add to Trip!</small></a>);
    return destinationName;
  }

  createTable() {
    let dest = this.state.places.map((item, index) => {
        return <td>{this.createDestination(item, index)}</td>;
    });
    let table = [];
    for (let i = 0; i < dest.length; ++i) {
        table.push(<tr key={i}>{ dest[i] }</tr>);
    }
    return (
      <table className="table table-responsive table-hover">
          <thead>
            <tr><th className="table-info align-middle" scope="col">Destinations</th></tr>
          </thead>
          <tbody>
            {table}
          </tbody>
      </table>
    );
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
          <button id="add-all" className="btn btn-default btn-sm"
                  onClick={()=>this.updateDestinations(0, size)}>Add All</button>
          <button id="clear" className="btn btn-danger btn-sm" onClick={()=>this.updateData([], "places")}>Clear</button>
        </div>
        <Search query={this.state.query} updateData={this.updateData}/>
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
          <h6>Enter the name of a destination that you would like to visit!</h6>
            <Filter query={this.state.query}/> <br/>
          <input id="destination" type="text" className="form-control"
                 onChange={(e)=>this.updateData(e.target.value, "query")} placeholder="Destination name..."/>
          <br/> {this.createTable()}
        </div>
          {footer}
      </div>
    )
  }

  render() {

    return(
      <div id="query">
        <button type="button" id="lookUp" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#customSearchModal">Look Up</button>

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