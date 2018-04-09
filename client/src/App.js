import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "10",
      name: "Andromeda",
      config: {
        type        : "config",
        version     : 2,
        optimization: 1,
        units       : [],
        maps        : [],
        filters     : []
      }
    };

    this.getConfig = this.getConfig.bind(this);
  }

  componentWillMount(){
    this.getConfig();
  }

  fetchResponse(){

    return fetch('http://' + location.host + '/config', {
      method:"GET",
    });
  }

  async getConfig(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      this.setState({config : tffi});
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Application config={this.state.config}/>
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
