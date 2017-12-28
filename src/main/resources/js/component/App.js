import React from 'react';
import Navigation from "./Navigation";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";

const App = () => {
    return(
        <div>
            <Navigation />
            <Switch>
                <Route exact path="/" render={() => (<Home />)}/>
                <Route exact path="/register" render={() => (<Registration />)}/>
                <Route exact path="/login" render={() => (<Login />)}/>
            </Switch>
        </div>
    )
};

export default App;