import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Application from './Application';
import Footer from './Footer';
import Staff from './Staff';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number  : "10",
      name    : "Andromeda",
      host    : location.host,
      webpage : "trip",
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
    this.updateWebpage = this.updateWebpage.bind(this);
  }

  componentWillMount(){
    this.getConfig();
  }

  updateHost(data) {
    this.setState({host : data}, () => {
      this.getConfig();
    });
  }

  updateWebpage(e, page) {
    e.preventDefault();
    this.setState({webpage : page});
  }

  fetchResponse(){
    return fetch('http://' + this.state.host + '/config', {
      method: "GET",
      header: {'Access-Control-Allow-Origin':'*'}
    });
  }

  async getConfig(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(JSON.stringify(tffi, null, 2));
      this.setState({config : tffi});
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    const showTrip = {
      'display': this.state.webpage === ("trip") ? 'block' : 'none'
    };

    const showStaff = {
      'display': this.state.webpage === ("staff") ? 'block' : 'none'
    };

    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Navigation name={this.state.name} updateWebpage={this.updateWebpage}/>
            <div style={showTrip}>
              <Application  config={this.state.config} host={this.state.host}
                           updateHost={this.updateHost}/>
            </div>
            <div style={showStaff}>
              <Staff />
            </div>
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
