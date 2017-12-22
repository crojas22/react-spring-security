import React, { Component } from 'react';
import LogInForm from "./LogInForm";

class Navigation extends Component {

    state = {
        showNavBar : false,
        showLogInForm: false
    };

    toggleShowNavBar = () => this.setState({ showNavBar : !this.state.showNavBar });

    toggleShowLogInForm = () => this.setState({ showLogInForm : !this.state.showLogInForm });

    render() {
        return(
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler border-0" type="button" onClick={ this.toggleShowNavBar }>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={"collapse navbar-collapse " + (this.state.showNavBar ? "show" : "")}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    {
                        this.state.showLogInForm ? <LogInForm /> :
                            <button onClick={this.toggleShowLogInForm} type="button" className="btn btn-primary btn-sm rounded-0">
                                Log In
                            </button>
                    }
                </div>
            </nav>
        )
    }
}

export default Navigation;