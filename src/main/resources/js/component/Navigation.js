import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MdHome from "react-icons/lib/md/home";
import LogInForm from "./navbar/LogInForm";
import { BtnInput } from "./reusable/Buttons";
import {getUserInfoAction, loginAction, logoutAction} from "../actions";
import Logout from "./navbar/Logout";

class Navigation extends Component {

    state = {
        showNavBar : false,
        showLogInForm: false,
        isDown: false
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changeState = (name, target) => this.setState({ [ name ] : !target });

    logOutUser = history => this.props.logoutAction(history);

    logInUser = (user, history) => this.props.loginAction(user, history);

    render() {
        const {history, userInfo, auth, location} = this.props;
        return(

            // Will toggle between transparent depending on url
            <nav className={"navbar navbar-expand-md " + (location.pathname !== "/" ? "bg-light navbar-light" :
                location.pathname === "/" && this.state.isDown ? "fixed-top bg-light navbar-light"
                    : "fixed-top bg-transparent navbar-dark")}>

                <NavLink className="navbar-brand" exact to="/"><MdHome size={28}/></NavLink>

                <button className="navbar-toggler border-0" type="button"
                        onClick={() => this.changeState("showNavBar", this.state.showNavBar)}>

                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={"collapse navbar-collapse " + (this.state.showNavBar ? "show" : "")}>
                    <ul className="navbar-nav mr-auto">
                        {
                            // navLink will show if user authorized
                            auth ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/calendar">Calendar</NavLink>
                                </li> : null
                        }
                        {
                            // navLink will show if user authorized
                            auth ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/contacts">Contacts</NavLink>
                                </li> : null
                        }
                        {
                            auth ?
                                null :
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/register">Register</NavLink>
                                </li>
                        }
                    </ul>
                    {
                        // If authorized will give option to log out, else will be able to sign in using form
                        auth ? <Logout logOut={() => this.logOutUser(history)} userInfo={userInfo}/> :
                            this.state.showLogInForm ?

                                <LogInForm toggleShowLogInForm={() => this.changeState("showLogInForm", this.state.showLogInForm)}
                                           logInUser={ this.logInUser } history={history}/>
                                :
                                <BtnInput onClick={() => this.changeState("showLogInForm", this.state.showLogInForm)}
                                          title="Log in" classes="btn-primary "/>
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