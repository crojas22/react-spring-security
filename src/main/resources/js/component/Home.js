import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUserInfoAction} from "../actions";

class Home extends React.Component {
    componentDidMount() {
        this.props.verificationTest(this.props.history);
    }

    render() {

        return(
            <div>
                Hello
            </div>
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
        verificationTest: getUserInfoAction
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);