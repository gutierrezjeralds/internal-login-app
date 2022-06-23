import React from "react";
import { Link } from "react-router-dom"
import $ from 'jquery';
import { CONSTANTS } from '../Constants';
import {
    MDBContainer, MDBRow, MDBCol, MDBInput, MDBBox,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardText
} from 'mdbreact';
import Cookies from 'js-cookie'
// import Cookies from 'js-cookie'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isValidUser: 0,
            errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
        }
    }

    onLoginHandle(event) {
        event.preventDefault();
        const user = event.target.user.value;
        const pass = event.target.pass.value;
        if ((user && user !== undefined) && (pass && pass !== undefined)) { // Check if valid data input
            // Register data record
            $.ajax({
                url: "/api/register",
                type: "POST",
                data: JSON.stringify({
                    user: user,
                    pass: pass
                }),
                contentType: 'application/json',
                cache: false,
            })
            .then(
                (result) => {
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error: true,
                        isValidUser: false,
                        errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
                    })
                        
                    console.error(CONSTANTS.MESSAGE.ERROR_OCCURED, error)
                }
            )
            .catch(
                (err) => {
                    this.setState({
                        error: true,
                        isValidUser: false,
                        errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
                    })
                        
                    console.error(CONSTANTS.MESSAGE.ERROR_OCCURED, err)
                }
            )
        }
    }

    // On Change Input
    onInputChangeHandle(event) {
        event.preventDefault();
        this.setState({
            isValidUser: 0
        })
    }

    render() {
        document.title = CONSTANTS.MESSAGE.SINGIN_TITLE;
        return (
            <React.Fragment>
                <MDBContainer className="h-50vh">
                    <MDBRow className="h-50vh justify-content-center align-self-center">
                        <MDBCol sm="12" md="6" lg="6" className="justify-content-center align-self-center">
                            <MDBCard className="z-depth-2 w-100">
                                <MDBCardBody className="black-text">
                                    <MDBCardTitle className="font-weight-bold font-family-architects-daughter text-center">{CONSTANTS.MESSAGE.REGISTER}</MDBCardTitle>
                                    <MDBBox tag="div">
                                        <form onSubmit={this.onLoginHandle.bind(this)}>
                                            <MDBBox tag="div" className="grey-text">
                                                <MDBInput
                                                    onChange={this.onInputChangeHandle.bind(this)}
                                                    label={CONSTANTS.MESSAGE.EMAIL}
                                                    name="user"
                                                    icon="user"
                                                    type="email"
                                                    group required
                                                    className={this.state.isValidUser === 0 ? "" : this.state.isValidUser ? "form-control is-valid" : "form-control is-invalid"}
                                                />
                                                <MDBInput
                                                    onChange={this.onInputChangeHandle.bind(this)}
                                                    label={CONSTANTS.MESSAGE.PASSWORD}
                                                    name="pass"
                                                    icon="lock"
                                                    type="password"
                                                    group required
                                                    className={this.state.isValidUser === 0 ? "" : this.state.isValidUser ? "form-control is-valid" : "form-control is-invalid"}
                                                />
                                                <MDBBox tag="div" className={this.state.isValidUser === 0 ? "d-none" : this.state.isValidUser ? "d-none" : "invalid-feedback mt-1rem-neg mb-2 d-block"}>{this.state.errorMsg}</MDBBox>
                                            </MDBBox>
                                            <MDBBox tag="div" className="text-center">
                                                <button className="btn btn-default waves-effect waves-light">{CONSTANTS.MESSAGE.SIGNUP}</button>
                                            </MDBBox>
                                        </form>
                                    </MDBBox>
                                </MDBCardBody>
                                <MDBCardFooter>
                                    <MDBCardText className="float-right">
                                        {CONSTANTS.MESSAGE.ALREADYHAVE_ACCTOUNT} <Link to="/login">{CONSTANTS.MESSAGE.LOGIN}</Link>
                                    </MDBCardText>
                                </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        )
    }
}

export default Login