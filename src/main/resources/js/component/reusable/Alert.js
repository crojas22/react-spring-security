import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeMessageAction } from "../../actions/alert";

const Alert = ({alert, removeMessageAction}) => {
    return(
        alert.status ?
            <div className={"alert alert-" + (alert.classes)}>
                    <span>
                        {
                            alert.message
                        }
                    </span>
                <button type="button" className="close" onClick={() => removeMessageAction(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            :
            null
    )
};

const mapStateToProps = state => {
    return {
        alert: state.alertMessage
    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeMessageAction
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);