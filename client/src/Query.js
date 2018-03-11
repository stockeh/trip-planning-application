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
        query   : "",
        places  : []
      },
      destination: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateSearch(tffi){
    console.log("updateSearch");
    console.log("TFFI " + tffi);
    this.setState({search:tffi});
  }

  updateQuery(event) {
    let newSearch = Object.assign({}, this.state.search);
    newSearch.query = event.target.value
    this.setState({search: newSearch})
  }

  render() {
    return(
      <div id="query">
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#customSearchModal">Look Up</button>

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
                <br/> @todo ... add clickable itinerary to add destinations to tip.
              </div>

              <div className="modal-footer">
                <Search search={this.state.search} updateSearch={this.updateSearch}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Query;