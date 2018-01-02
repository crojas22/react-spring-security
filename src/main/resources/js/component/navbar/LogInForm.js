import React from 'react';
import { BtnSubmit } from "../reusable/Buttons";

const LogInForm = ({logInUser, history, toggleShowLogInForm}) => {
    let _email, _password;

    const handleSubmit= e => {
        e.preventDefault();
        logInUser({
            password: _password.value,
            userName: _email.value
        }, history);
        toggleShowLogInForm();
        _email.value = "", _password.value = "";
    };

    return(
        <form className="form-inline" onSubmit={handleSubmit}>
            <input type="text" name="username" ref={input => _email = input}
                   className="form-control form-control-sm mr-1" placeholder="Email" required/>
            <input name="password" type="password" ref={input => _password = input}
                   className="form-control form-control-sm mr-1" placeholder="Password" required/>
            <BtnSubmit title="Log in" classes="btn-primary btn-sm" />
        </form>
    )
};

export default LogInForm;