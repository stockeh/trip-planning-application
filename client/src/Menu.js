import React, {Component} from 'react';
import './css/w3.css';
import Trip from './Trip';
import IoChevronLeft from 'react-icons/lib/io/chevron-left';
import { green_btn, green_hvr, green_logo, green_hvr_logo, bg_csu_green } from './css/styling.css';
import { Button}  from 'reactstrap';

/* Renders a menu that slides from the side
 */
class Menu extends Component{
    constructor(props) {
        super(props);

        this.closeMenu = this.closeMenu.bind(this);
    }

    closeMenu() {
        document.getElementById("side-menu").style.display = "none";
    }

    render() {
        return(
            <div className="w3-sidebar w3-bar-block col-xs-12 col-s-10 col-m-8 col-lg-6 w3-animate-left " id="side-menu">
                <Button id="side-menu-close">
                    <IoChevronLeft size={40} onClick={this.closeMenu}/>
                </Button>
                <div className="col-12">
                    <Trip trip={this.props.trip} updateTrip={this.props.updateTrip} updateInformation={this.props.updateInformation}
                          reverseTrip={this.props.reverseTrip} updateStartingLocation={this.props.updateStartingLocation}
                          resetDestinations={this.props.resetDestinations} placeInformation={this.props.placeInformation}
                          config={this.props.config}/>
                </div>
            </div>
        )
    }
}

export default Menu;
