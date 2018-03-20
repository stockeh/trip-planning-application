import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';
import Config from "./Config";

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "10",
      name: "Andromeda",
    }
  }

  render() {
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Application />
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
