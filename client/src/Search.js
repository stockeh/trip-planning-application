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
      "version"    : this.props.search.version,
      "type"       : this.props.search.type,
      "query"      : this.props.search.query,
      "places"     : this.props.search.places
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
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateSearch(tffi);
    } catch(err) {
      console.error(err);
    }
  }
  render(){
    return(
      <div id="search">
          <button className="btn btn-primary " onClick={this.search} type="button">Search</button>
      </div>
    )
  }
}

export default Search;