import React from 'react';
import Navigation from "./Navigation";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Calendar from "./Calendar";

const App = () => {
    return(
        <div style={{height: "100%"}}>
            <Navigation />
            <Switch>
                <Route exact path="/" render={props => (<Home {...props}/>)}/>
                <Route exact path="/register" render={props => (<Registration history={props.history}/>)}/>
                <Route exact path="/login" render={props => (<Login history={props.history}/>)}/>
                <Route exact path="/Calendar" render={props => (<Calendar history={props.history}/>)}/>
            </Switch>
        </div>
    )
};

export default App;