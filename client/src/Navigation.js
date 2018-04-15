import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './css/navbar.css';


class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.collapsable = this.collapsable.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    collapsable(){
        return(
            <div className="">
                <Navbar color="light" light expand="md">
                    <NavbarToggler className="nav_side_bar" onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )

    }

    render() {
        let sidebar = this.collapsable();
        return(
            <div className="">
                {sidebar}
                <Navbar className="nav_bar">
                    <NavbarBrand className="nav_title" href="">Andromeda</NavbarBrand>
                    <div>
                        <NavLink className="nav_item" href="">Development</NavLink>
                        <NavLink className="nav_item" href="">Staff</NavLink>
                        <NavLink className="nav_item" href="">Trip Planner</NavLink>
                    </div>
                </Navbar>

            </div>

        )
    }

}

export default Navigation;