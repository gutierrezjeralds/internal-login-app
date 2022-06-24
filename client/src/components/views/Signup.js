import React from "react";
import { Link } from "react-router-dom"
import $ from 'jquery';
import { CONSTANTS } from '../Constants';
import {
    MDBContainer, MDBRow, MDBCol, MDBInput, MDBBox,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardText, MDBIcon
} from 'mdbreact';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'js-cookie'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isValidUser: 0,
            in_submit: false,
            errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
        }
    }

    onRegisterHandle(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.pass.value;

        this.setState({
            isValidUser: 0,
            in_submit: true
        })

        if ((email && email !== undefined) && (pass && pass !== undefined)) { // Check if valid data input
            // Notification x due to slow db connection in server
            toast.info(CONSTANTS.MESSAGE.PLEASEWAIT, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });


            // Register data record
            $.ajax({
                url: "/api/register",
                type: "POST",
                data: JSON.stringify({
                    email: email,
                    pass: pass
                }),
                contentType: 'application/json',
                cache: false,
            })
            .then(
                (result) => {
                    if (!result.error) {
                        // Sucess registered
                        Cookies.set("email", email);
                        // Reload page
                        window.location.href = "/";
                    } else {
                        // Incorrect / Invalid Credential
                        this.setState({
                            isValidUser: false,
                            in_submit: false,
                            errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
                        })
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error: true,
                        isValidUser: false,
                        in_submit: false,
                        errorMsg: CONSTANTS.MESSAGE.UNEXPECTED_ERROR
                    })

                    if (error.responseJSON !== undefined && error.responseJSON.data === "ER_DUP_ENTRY") {
                        // Duplicate record
                        this.setState({errorMsg: CONSTANTS.MESSAGE.DUPLICATE_RECORD})
                    }
                        
                    console.error(CONSTANTS.MESSAGE.ERROR_OCCURED, error)
                }
            )
            .catch(
                (err) => {
                    this.setState({
                        error: true,
                        isValidUser: false,
                        in_submit: false,
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

    // Render Submit Button Element
    renderSubmitElement(){
        if ( this.state.in_submit ) {
            // Already clicked the submit button
            return (
                <button className="btn btn-default waves-effect waves-light disabled">
                    <MDBIcon icon="spinner" className="fa-spin mr-2" />
                    {CONSTANTS.MESSAGE.LOADING}
                </button>
            )
        } else {
            // Onload element display
            return (
                <button className="btn btn-default waves-effect waves-light">
                    {CONSTANTS.MESSAGE.SIGNUP}
                </button>
            )
        }
    }

    render() {
        document.title = CONSTANTS.MESSAGE.SINGUP_TITLE;
        return (
            <React.Fragment>
                <MDBContainer className="h-50vh">
                    <MDBRow className="h-50vh justify-content-center align-self-center">
                        <MDBCol sm="12" md="6" lg="6" className="justify-content-center align-self-center">
                            <MDBCard className="z-depth-2 w-100">
                                <MDBCardBody className="black-text">
                                    <MDBCardTitle className="font-weight-bold font-family-architects-daughter text-center">{CONSTANTS.MESSAGE.REGISTER}</MDBCardTitle>
                                    <MDBBox tag="div">
                                        <form onSubmit={this.onRegisterHandle.bind(this)}>
                                            <MDBBox tag="div" className="grey-text">
                                                <MDBInput
                                                    onChange={this.onInputChangeHandle.bind(this)}
                                                    label={CONSTANTS.MESSAGE.EMAIL}
                                                    name="email"
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
                                                {this.renderSubmitElement()}
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
                <ToastContainer />
            </React.Fragment>
        )
    }
}

export default Register