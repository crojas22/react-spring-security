import React from 'react';
import { BtnSubmit } from "../reusable/Buttons";

const LogInForm = () => {
    return(
        <form className="form-inline">
            <input type="text" className="form-control form-control-sm mr-1" name="username" placeholder="Email" required/>
            <input type="text" className="form-control form-control-sm mr-1" name="password" placeholder="Password" required/>
            <BtnSubmit title="Log in" classes="btn-primary btn-sm" />
        </form>
    )
};

export default LogInForm;