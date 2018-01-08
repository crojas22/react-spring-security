import React from 'react';
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Calendar from "./calendar/Calendar";
import {JustifyContentCenter} from "./reusable/DivReusables";

class CalendarPage extends React.Component {
    componentDidMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    render() {
        return(
            <JustifyContentCenter>
                <Calendar />
            </JustifyContentCenter>
        )
    }
}

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction
    }, dispatch)
};

export default withRouter(connect(null, mapDispatchToProps)(CalendarPage));