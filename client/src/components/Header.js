import React from "react";
import { Link } from "react-router-dom"
import { CONSTANTS } from './Constants';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBBox
} from "mdbreact";
import Cookies from 'js-cookie'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isUser: this.props.user || ""
        };
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogoutHandle(event) {
        event.preventDefault();
        // Logout x removed cookie
        Cookies.set('user', '');
        // Reload page
        window.location.reload();
    }

    render() {
        return (
            <MDBNavbar color="default-color" dark expand="md">
                <MDBNavbarBrand>
                    <Link to="/" className="white-text">
                        <strong className="white-text">{CONSTANTS.MESSAGE.INTERNAL_LOGIN}</strong>
                    </Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav right>
                        {
                            this.state.isUser !== null && this.state.isUser !== undefined && this.state.isUser !== "" ? (
                                // Already login
                                <React.Fragment>
                                    <MDBNavItem>
                                        <MDBBox tag="div" className="nav-link waves-effect waves-light" onClick={this.onLogoutHandle.bind(this)}>{CONSTANTS.MESSAGE.LOGOUT}</MDBBox>
                                    </MDBNavItem>
                                </React.Fragment>
                            ) : (
                                // Not yet login
                                <React.Fragment>
                                    <MDBNavItem>
                                        <Link to="/login" className="nav-link waves-effect waves-light">{CONSTANTS.MESSAGE.LOGIN}</Link>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Link to="/register" className="nav-link waves-effect waves-light">{CONSTANTS.MESSAGE.REGISTER}</Link>
                                    </MDBNavItem>
                                </React.Fragment>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        )
    };
}

export default Home