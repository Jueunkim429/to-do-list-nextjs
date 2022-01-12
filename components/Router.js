import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../pages/Auth";
import Todo from "./Todo";

const AppRouter = ({refreshUser, isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn&&userObj=={userObj}}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/"> 
                        <Todo userObj={userObj} refreshUser={refreshUser} />
                    </Route>

                </> 
                ) : (
                    <>
                    <Route exact path="/">
                      <Auth />
                    </Route>
                  </>
                )};
            </Switch>
        </Router>
    )
};

export default AppRouter;