import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../pages/Auth";

import Todo from "./Todo";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/"> 
                        <Todo userObj={userObj} />
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