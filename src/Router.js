import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Intro,Location,FoodType,Result,List} from "./pages";

export default function Navigator() {
  return(
    <Router>
      <Route exact path="/" component={Intro}/>
      <Route path="/location" component={Location}/>
      <Route path="/foodtype" component={FoodType}/>
      <Route path="/result" component={Result}/>
      <Route path="/list" component={List}/>
    </Router>
  )
}