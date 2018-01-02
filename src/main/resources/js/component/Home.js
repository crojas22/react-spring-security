import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verificationTest } from "../actions";

class Home extends React.Component {
    componentDidMount() {
        this.props.verificationTest(this.props.history);
    }

    render() {
        const {auth , userInfo} = this.props;
        const authorized = auth ? <div>{userInfo.firstName}</div> : <div>not authorized</div>;

        return(
            authorized
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
        verificationTest
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);