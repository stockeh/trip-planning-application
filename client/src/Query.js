import React, {Component} from 'react';
import Search from './Search';

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
        places: []
    };
    this.updateData = this.updateData.bind(this);
    this.updateDestinations = this.updateDestinations.bind(this);

    this.createDestination = this.createDestination.bind(this);
    this.createTable = this.createTable.bind(this);

    this.modalContent = this.modalContent.bind(this);
  }

  updateData(data, obj) {
    this.setState({[obj]: data});
  }
  updateDestinations(index) {
    let newPlaces = this.state.places;
    let removedItem = newPlaces.splice(index, 1);
    this.props.updatePlaces(removedItem[0]);
    this.setState({places: newPlaces});
  }

  createDestination(item, index) {
    let destinationName = [item.name];
    destinationName.push(<a key={item.name} className="text-info font-weight-light"
                            style={{cursor:'pointer'}}
                            onClick={() => {
                              this.updateDestinations(index);
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

  modalContent() {
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
          <input id="destination" type="text" className="form-control"
                 onChange={(e)=>this.updateData(e.target.value, "query")} placeholder="Destination name..."/>
          <br/> {this.createTable()}
        </div>

        <div className="modal-footer">
          <Search query={this.state.query} updateData={this.updateData}/>
        </div>
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