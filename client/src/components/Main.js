import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
// import Footer from './Footer'
import Home from './views/Home'
import Signin from './views/Signin'
import Signup from './views/Signup'
import Cookies from 'js-cookie'
import { MDBBox } from 'mdbreact'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            promptUser: Cookies.get("email")
        }
    }

    renderBody() {
        return (
            <React.Fragment>
                <Header user={this.state.promptUser} />
                <Switch >
                    {/* Home */}
                    <Route exact path="/" key="home"
                        render = {
                            () => (
                                <Home user={this.state.promptUser} />
                            )
                        }
                    />
                    {/* Login */}
                    <Route exact path="/login" key="login"
                        render = {
                            () => (
                                this.state.promptUser !== null && this.state.promptUser !== undefined && this.state.promptUser !== "" ? (
                                    <Home user={this.state.promptUser} />
                                ) : (
                                    <Signin />
                                )
                            )
                        }
                    />
                    {/* Register */}
                    <Route exact path="/register" key="register"
                        render = {
                            () => (
                                this.state.promptUser !== null && this.state.promptUser !== undefined && this.state.promptUser !== "" ? (
                                    <Home user={this.state.promptUser} />
                                ) : (
                                    <Signup />
                                )
                            )
                        }
                    />
                </Switch>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    {this.renderBody()}
                </Router>
            </React.Fragment>
        )
    }
}

export default Main