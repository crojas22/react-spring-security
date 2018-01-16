import React from 'react';
import { BtnLink } from "./reusable/Buttons";
import { connect } from "react-redux";

const Home = ({auth}) => {
    return(
        <div className="homepage">
            <div>
                <h1>Manage events like never before</h1>
                <BtnLink to={auth ? "/calendar" : "/login"} title={auth ? "My Calendar" : "Log in"} classes="btn-primary "/>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        auth: state.userAuthorized
    }
};

export default connect(mapStateToProps)(Home);