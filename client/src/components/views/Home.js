import React from "react";
import { CONSTANTS } from '../Constants';
import {
    MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBBox
} from "mdbreact";
import Cookies from 'js-cookie'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUser: this.props.user || ""
        };
    }

    render() {
        document.title = CONSTANTS.MESSAGE.HOME_TITLE;
        return (
            <MDBContainer className="mt-5 text-center">
                <MDBRow>
                    <MDBCol>
                        <MDBJumbotron>
                            <MDBBox tag="h2" className="h1 display-3">{CONSTANTS.MESSAGE.HELLO} {this.state.isUser !== "" ? this.state.isUser : CONSTANTS.MESSAGE.WORLD}</MDBBox>
                            <MDBBox tag="p" className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</MDBBox>
                            <hr className="my-2" />
                            <MDBBox tag="p">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MDBBox>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    };
}

export default Home