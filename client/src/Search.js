import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }


  /* Sends a request to the server with the query.
   * Receives a response containing the places and updates the
   * state for this object.
   */
  fetchResponse(){
    // need to get the request body from the query in state object.
    let requestBody = {
        "version" : this.props.trip.version,
        "type"    : this.props.trip.type,
        "query"   : this.props.trip.query,
        "places"  : []
    };

    console.log(process.env.SERVICE_URL);
    console.log(requestBody);

    return fetch('http://' + location.host + '/query', {
      method:"POST",
      body: JSON.stringify(requestBody)
    });
  }

  async search(){
    try {
      let serverResponse = await this.fetchResponse();
      this.props.setPreCheck(false);
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateDataPlaces(tffi.places);
    } catch(err) {
      console.error(err);
    }
  }

  render(){
    if (this.props.precheck) {
      if (this.props.trip.type === "query" && this.props.trip.query !== "")
        document.getElementById("searchButton").click();
    }
    return(
      <div id="search">
          <button className="btn btn-primary" id="searchButton" onClick={this.search}
                  type="button">Search</button>
      </div>
    )
  }
}

export default Search;