import React, { Component } from 'react';
import Navigation from "./Navigation";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";

class App extends Component {

    render() {

        return(
            <div>
                <Navigation />
                <Switch>
                    <Route exact path='/' render={() => (<Home />)}/>
                    <Route exact path='/register' render={() => (<Registration />)}/>
                </Switch>
            </div>
        )
    }

}

export default App;