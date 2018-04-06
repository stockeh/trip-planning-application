import React, {Component} from 'react';
import MdSearch from 'react-icons/lib/md/search';
import {Button} from 'reactstrap';

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
        "version" : 2,
        "type"    : "query",
        "query"   : this.props.query,
        "filters" : this.props.filters,
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
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateData(tffi.places, "places");
    } catch(err) {
      console.error(err);
    }
  }

  render(){
    return(
      <div id="search">
        <Button outline color="primary"><MdSearch size={24} id="searchButton" onClick={this.search}/></Button>
      </div>
    )
  }
}

export default Search;