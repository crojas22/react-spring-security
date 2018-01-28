import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { JustifyContentCenter, FormRowCol } from "./reusable/DivReusables";
import { BtnSubmit } from "./reusable/Buttons";
import { registerAction } from "../actions";
import Alert from "./reusable/Alert";

const Registration = ({registerAction, history}) => {

    let _firstName, _lastName, _email, _password;

    const handleSubmit = e => {
        e.preventDefault();
        registerAction({
            firstName: _firstName.value,
            lastName: _lastName.value,
            userName: _email.value,
            password: _password.value
        }, history);
        _firstName.value = "", _lastName.value = "", _email.value = "", _password.value = "";
    };

    return(
        <JustifyContentCenter>
            <form className="registration" onSubmit={ handleSubmit }>
                <h4>Register</h4>
                <Alert />
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" id="firstName" ref={input => _firstName = input}
                               className="form-control" placeholder="First name" required />
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text" name="lastName" ref={input => _lastName = input}
                               className="form-control" placeholder="Last name" required />
                    </div>
                </div>

                <FormRowCol>
                    <input type="text" name="email" ref={input => _email = input}
                           className="form-control" placeholder="Email" required />
                </FormRowCol>

                <FormRowCol>
                    <input type="password" name="password" ref={input => _password = input}
                           className="form-control" placeholder="New password" required />
                </FormRowCol>

                <BtnSubmit title='Register' classes='btn-primary' />
                <span className="mx-2 text-muted">or</span>
                <Link to="/login">Login</Link>
            </form>
        </JustifyContentCenter>
    )
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerAction
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Registration);