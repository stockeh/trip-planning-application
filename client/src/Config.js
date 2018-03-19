import React, {Component} from 'react';
import Query from "./Query";

class Config extends Component {

  constructor(props){
    super(props);
  }

  updateOptimization(tffiOptimization){
    this.props.updateOptimization(tffiOptimization);
    this.setState({optimization : tffiOptimization});
  }

  fetchResponse(){
    // need to get the request body from the query in state object.
    let requestBody = {
      "version" : this.props.trip.version,
      "type"    : this.props.trip.type,
      "optimization"  : 0
    };

    console.log(process.env.SERVICE_URL);
    console.log(requestBody);

    return fetch('http://' + location.host + '/config', {
      method:"POST",
      body: JSON.stringify(requestBody)
    });
  }

  async getConfig(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateOptimization(tffi.optimization);
    } catch(err) {
      console.error(err);
    }
  }

}

export default Config;