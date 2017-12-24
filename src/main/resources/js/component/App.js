import React from 'react';
import Navigation from "./Navigation";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";

const App = () => {
    return(
        <div>
            <Navigation />
            <Switch>
                <Route exact path='/' render={() => (<Home />)}/>
                <Route exact path='/register' render={() => (<Registration />)}/>
            </Switch>
        </div>
    )
};

export default App;