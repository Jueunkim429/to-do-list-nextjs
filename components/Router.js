import React from "react";
import Auth from "../pages/Auth";
import Todo from "./Todo";

const AppRouter = ({refreshUser, isLoggedIn, userObj }) => {
    return(
        <>
        {isLoggedIn&&userObj=={userObj}}
            {isLoggedIn ? (
            <>
                <Todo userObj={userObj} refreshUser={refreshUser} />
            </> 
            ) : (
            <>
                <Auth />
            </>
            )};
        </>
    )
};

export default AppRouter;