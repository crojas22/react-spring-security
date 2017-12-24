import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LogInForm from "./navbar/LogInForm";
import { BtnInput } from "./reusable/Buttons";

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
                <NavLink className="navbar-brand" exact to="/">Home</NavLink>
                <button className="navbar-toggler border-0" type="button" onClick={ this.toggleShowNavBar }>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={"collapse navbar-collapse " + (this.state.showNavBar ? "show" : "")}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    {
                        this.state.showLogInForm ? <LogInForm /> :
                            <BtnInput onClick={ this.toggleShowLogInForm } title="Log in" classes="btn-primary btn-sm"/>
                    }
                </div>
            </nav>
        )
    }
}

export default Navigation;