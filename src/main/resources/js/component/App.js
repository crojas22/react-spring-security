import React from 'react';
import Navigation from "./Navigation";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import CalendarPage from "./CalendarPage";

const App = () => {
    return(
        <div>
            <Navigation />
            <Switch>
                <Route exact path="/" render={props => (<Home {...props}/>)}/>
                <Route exact path="/register" render={props => (<Registration history={props.history}/>)}/>
                <Route exact path="/login" render={props => (<Login history={props.history}/>)}/>
                <Route exact path="/Calendar" render={props => (<CalendarPage history={props.history}/>)}/>
            </Switch>
        </div>
    )
};

export default App;