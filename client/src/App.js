import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "10",
      name  : "Andromeda",
      host  : location.host,
      config: {
        type        : "config",
        version     : 2,
        optimization: 2,
        units       : [],
        maps        : [],
        filters     : []
      }
    };

    this.getConfig = this.getConfig.bind(this);
    this.updateHost = this.updateHost.bind(this);
  }

  updateHost(data) {
    this.setState({host : data})
  }

  componentWillMount(){
    this.getConfig();
  }

  fetchResponse(){

    return fetch('http://' + this.state.host + '/config', {
      method:"GET",
      header: {'Access-Control-Allow-Origin':'*'}
    });
  }

  async getConfig(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(JSON.stringify(tffi));
      this.setState({config : tffi});
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Application config={this.state.config} host={this.state.host}
                         updateHost={this.updateHost}/>
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
