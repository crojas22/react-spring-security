import React from 'react';

const LogInForm = () => {
    return(
        <form className="form-inline">
            <input type="text" className="form-control form-control-sm mr-1" name="username" placeholder="Username"/>
            <input type="text" className="form-control form-control-sm mr-1" name="password" placeholder="Password"/>
            <button type="submit" className="btn btn-primary btn-sm rounded-0">Log in</button>
        </form>
    )
};

export default LogInForm;