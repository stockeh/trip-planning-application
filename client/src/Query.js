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
      search: { // default Query
        version : 2,
        type    : "query",
        query   : "denver",
        places  : []
      }
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.buildDestination = this.buildDestination.bind(this);
    this.updateDestinations = this.updateDestinations.bind(this);
    this.createTable = this.createTable.bind(this);
    this.loadedQuery = this.loadedQuery.bind(this);
  }

  updateSearch(tffi) {
    this.setState({search : tffi});
  }

  updateQuery(event) {
    console.log(event.target.value);
    this.props.updateQuery(event.target.value);
  }

  updateDestinations(index) {
    let newSearch = Object.assign({}, this.state.search);
    let removedItem = newSearch.places.splice(index, 1);
    this.props.updatePlaces(removedItem[0]);
    this.setState({search: newSearch});
  }

  buildDestination(item, index) {
    let destinationName = [item.name];
    destinationName.push(<a key={item.name} className="text-info font-weight-light"
                            style={{cursor:'pointer'}}
                            onClick={() => {
                              this.updateDestinations(index);
                              }}><br/><small>Add to Trip!</small></a>);
    return destinationName;
  }

  createTable() {
    let dest = this.state.search.places.map((item, index) => {
        return <td>{this.buildDestination(item, index)}</td>;
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

  loadedQuery() {
    if (this.props.precheck) {
      if (this.props.trip.type === "query") {
        document.getElementById("lookUp").click();
      }
    }
  }

  render() {
    this.loadedQuery();
    return(
      <div id="query">
        <button type="button" id={"lookUp"} className="btn btn-primary btn-sm" data-toggle="modal" data-target="#customSearchModal">Look Up</button>

        <div className="modal fade" id="customSearchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="searchModalLabel">Build a Custom Trip!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <h6>Enter the name of a destination that you would like to visit!</h6>
                <input id="destination" type="text" className="form-control" onChange={this.updateQuery} placeholder="Destination name..."/>
                <br/> {this.createTable()}
              </div>

              <div className="modal-footer">
                <Search search={this.state.search} precheck={this.props.precheck} trip={this.props.trip} setPreCheck={this.props.setPreCheck} updateSearch={this.updateSearch}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Query;