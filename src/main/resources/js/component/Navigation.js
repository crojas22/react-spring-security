import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LogInForm from "./navbar/LogInForm";
import { BtnInput } from "./reusable/Buttons";
import {getUserInfoAction, loginAction, logoutAction} from "../actions";
import Logout from "./navbar/Logout";

class Navigation extends Component {

    state = {
        showNavBar : false,
        showLogInForm: false
    };

    componentDidMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    toggleShowNavBar = () => this.setState({ showNavBar : !this.state.showNavBar });

    toggleShowLogInForm = () => this.setState({ showLogInForm : !this.state.showLogInForm });

    logOutUser = history => this.props.logoutAction(history);

    logInUser = (user, history) => this.props.loginAction(user, history);

    render() {
        const {history, userInfo, auth} = this.props;

        return(
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <NavLink className="navbar-brand" exact to="/">Home</NavLink>
                <button className="navbar-toggler border-0" type="button" onClick={this.toggleShowNavBar}>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={"collapse navbar-collapse " + (this.state.showNavBar ? "show" : "")}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/register">Register</NavLink>
                        </li>
                        {
                            // navLink will show if user authorized
                            auth ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/calendar">Calendar</NavLink>
                                </li> : null
                        }
                    </ul>
                    {
                        // If authorized will give option to log out, else will be able to sign in using form
                        auth ? <Logout logOut={() => this.logOutUser(history)} userInfo={userInfo}/> :
                            this.state.showLogInForm ?
                                <LogInForm logInUser={this.logInUser} history={history} toggleShowLogInForm={this.toggleShowLogInForm}/> :
                                <BtnInput onClick={ this.toggleShowLogInForm } title="Log in" classes="btn-primary btn-sm"/>
                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.userAuthorized,
        userInfo: state.userInfo
    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction,
        logoutAction,
        loginAction
    }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));