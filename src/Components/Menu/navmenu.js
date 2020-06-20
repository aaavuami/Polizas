import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './navmenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-md navbar-toggleable-md ng-white border-bottom mb-3 active imagenNav" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className="TituloBanner">Contabilidad</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-md-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow text-right">
                <NavItem>
                  <NavLink tag={Link} className="text-dark text-right" to="/reclamo">Reclamo</NavLink>
                  <NavLink tag={Link} className="text-dark text-right" to="/poliza">Póliza</NavLink>
                  <NavLink tag={Link} className="text-dark text-right" to="/instruccion">Reglas</NavLink>
                  <NavLink tag={Link} className="text-dark text-right" to="/contabilidad">Contabilidad</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}