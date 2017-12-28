import React from 'react';
import { Link } from 'react-router-dom';
import { JustifyContentCenter, FormRowCol } from "./reusable/DivReusables";
import { BtnSubmit } from "./reusable/Buttons";

const Login = () => {
    let _email, _password;

    return (
        <JustifyContentCenter>
            <form className="login">
                <h4>Login</h4>

                <FormRowCol>
                    <input type="text" name="email" ref={input => _email = input}
                           className="form-control border-0" placeholder="Email" required/>
                </FormRowCol>
                <FormRowCol>
                    <input type="password" name="password" ref={input => _password = input}
                           className="form-control border-0" placeholder="Password" required/>
                </FormRowCol>

                <BtnSubmit title='Login' classes='btn-primary'/>
                <span className="mx-2 text-muted">or</span>
                <Link to="/register">Register</Link>

            </form>

        </JustifyContentCenter>
    )
};

export default Login;