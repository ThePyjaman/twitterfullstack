import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserContext } from "../Provider/UserProvider";
import PasswordReset from "./PasswordReset";
import HomePage from "./HomePage";
import PictureTweet from "./PictureTweet";
import {Router} from "@reach/router";

function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            <HomePage path = "HomePage" />
            :
            <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
                <PasswordReset path = "passwordReset" />
            </Router>

    );
}

export default Application;
