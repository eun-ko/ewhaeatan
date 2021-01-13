import React from "react";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {Intro,Location,FoodType,Result,List,Register,NotFound} from "../pages";

export default function Navigator() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Intro}/>
        <Route path="/location" component={Location}/>
        <Route path="/foodtype" component={FoodType}/>
        <Route path="/result" component={Result}/>
        <Route path="/list" component={List}/>
        <Route path="/register" component={Register}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  )
}