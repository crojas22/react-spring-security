import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { JustifyContentCenter, FormRowCol } from "./reusable/DivReusables";
import { BtnSubmit } from "./reusable/Buttons";
import { loginAction } from "../actions";
import Alert from "./reusable/Alert";

const Login = ({loginAction, history}) => {
    let _email, _password;

    const handleSubmit = e => {
        e.preventDefault();
        loginAction({
            password: _password.value,
            userName: _email.value
        }, history);
        _email.value = "", _password.value = "";
    };

    return (
        <JustifyContentCenter>
            <form className="login" onSubmit={ handleSubmit }>
                <h4>Login</h4>
                <Alert />
                <FormRowCol>
                    <input type="text" name="email" ref={input => _email = input}
                           className="form-control" placeholder="Email" required/>
                </FormRowCol>
                <FormRowCol>
                    <input type="password" name="password" ref={input => _password = input}
                           className="form-control" placeholder="Password" required/>
                </FormRowCol>

                <BtnSubmit title='Login' classes='btn-primary'/>
                <span className="mx-2 text-muted">or</span>
                <Link to="/register">Register</Link>

            </form>

        </JustifyContentCenter>
    )
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loginAction
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Login);