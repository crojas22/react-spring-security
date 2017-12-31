import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verificationTest } from "../actions";

class Home extends React.Component {
    componentDidMount() {
        this.props.verificationTest()
    }

    render() {
        const authorized = this.props.auth ? <div>authorized</div> : <div>not authorized</div>;

        return(
            authorized
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.userAuthorized
    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        verificationTest
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);