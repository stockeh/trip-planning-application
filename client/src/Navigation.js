  import React, {Component} from 'react';
  import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
  import './css/navbar.css';
  import { Button}  from 'reactstrap';
  import MdMenu from 'react-icons/lib/md/menu';
  import MdClose from 'react-icons/lib/md/close';


  class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.collapsable = this.collapsable.bind(this);
    this.getToggler = this.getToggler.bind(this);

    this.renderNavItem = this.renderNavItem.bind(this);
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  getToggler(){
      if(!this.state.isOpen)return (<MdMenu size={25}/>);
      else return (<MdClose size={25}/>);
  }

  renderNavItem(tab, name) {
    return (
        <NavItem>
          <NavLink className="dropdown_item" href="" onClick={(e) => this.props.updateWebpage(e, tab)}>{name}</NavLink>
        </NavItem>
    )
  }

  collapsable(){
    let toggler = this.getToggler();
    return(
      <div className="">
          <Navbar className="nav_side_bar" light>
            <Button className="dropdown_icon" onClick={this.toggle}> {toggler}</Button>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.renderNavItem("trip", "Trip Planner")}
                {this.renderNavItem("staff", "Staff")}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    )
  }

  render() {
    let sidebar = this.collapsable();
    return(
      <div>
        {sidebar}
        <Navbar className="nav_bar">
            <NavbarBrand className="nav_title" href="">{this.props.name}</NavbarBrand>
            <div>
              <NavLink className="nav_item" href="" onClick={(e) => this.props.updateWebpage(e, "staff")}>Staff</NavLink>
              <NavLink className="nav_item" href="" onClick={(e) => this.props.updateWebpage(e, "trip")}>Trip Planner</NavLink>
            </div>
          </Navbar>
        </div>
      )
  }

  }

  export default Navigation;
