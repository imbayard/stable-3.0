import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Welcome from "./containers/Welcome";
import SetSettings from "./containers/SetSettings";

export default function Routes() {
    return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <AuthenticatedRoute exact path="/settings">
                    <Settings />
                </AuthenticatedRoute>
                <UnauthenticatedRoute exact path="/signup">
                    <Signup />
                </UnauthenticatedRoute>
                <UnauthenticatedRoute exact path="/login">
                    <Login />
                </UnauthenticatedRoute>
                <AuthenticatedRoute exact path="/welcome">
                    <Welcome />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/set-settings">
                    <SetSettings />
                </AuthenticatedRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
    )
}