import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Lander from "./containers/Lander";
import SignIn from "./containers/SignIn";
import Dashboard from "./containers/Dashboard";
import Confirmed from "./containers/Confirmed";
import Profile from "./containers/Profile";
import Header from "./containers/Header";
import { UserContext } from "./contexts/userContext";
import { metrics } from "./themes";
import { CenteredDiv, H1, Toast, Message } from "./components";
import styled from "styled-components";
import firebase from "./firebase.js";
import "firebase/firestore";

const RouterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const RouterWrapperInner = styled.div`
  width: ${metrics.bodyWidth}px;
  height: 100%;
`;

const MainRouter = () => {
  const [initializationComplete, setInitComplete] = useState(false);
  const { userDispatch } = useContext(UserContext);
  const userId = firebase.auth().currentUser && firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        const uid = firebase.auth().currentUser.uid;
        let persistedUser = window.localStorage.getItem("userData");
        if (!persistedUser) {
          db.collection("users")
            .doc(uid)
            .get()
            .then(res => {
              if (res.data() && res.data().firstName) {
                userDispatch({ type: "additionalInfo", payload: res.data() });
                window.localStorage.setItem(
                  "userData",
                  JSON.stringify(res.data())
                );
              }
              console.log("HERE!");
              setInitComplete(true);
            });
        } else {
          userDispatch({
            type: "additionalInfo",
            payload: JSON.parse(persistedUser)
          });
          setInitComplete(true);
        }
      } else {
        userDispatch({ type: "additionalInfo", payload: { firstName: null } });
        setInitComplete(true);
      }
    });
  }, []);

  const noMatch = () => {
    return <H1>404</H1>;
  };

  const routeWithAuth = destination => {
    return !userId ? (
      <Redirect
        to={{
          pathname: "/signin"
        }}
      />
    ) : (
      destination
    );
  };

  const nestedSwitch = () => {
    return (
      <>
        {userId && <Header />}
        <Toast />
        <RouterWrapper>
          <RouterWrapperInner>
            <Switch>
              <Route
                exact
                path={"/"}
                render={() =>
                  userId ? (
                    <Redirect
                      to={{
                        pathname: "/dashboard"
                      }}
                    />
                  ) : (
                    <Lander />
                  )
                }
              />
              <Route
                path={"/signin"}
                render={() =>
                  userId ? (
                    <Redirect
                      to={{
                        pathname: "/dashboard"
                      }}
                    />
                  ) : (
                    <SignIn />
                  )
                }
              />
              <Route
                path={"/dashboard"}
                render={() => routeWithAuth(<Dashboard />)}
              />
              <Route
                path={"/profile"}
                render={() => routeWithAuth(<Profile />)}
              />
              <Route path="*" render={noMatch} />
            </Switch>
          </RouterWrapperInner>
        </RouterWrapper>
      </>
    );
  };

  const router = () => {
    return (
      <Router>
        <Switch>
          <Route path={"/confirmed"} render={() => <Confirmed />} />
          <Route path="*" render={nestedSwitch} />
        </Switch>
      </Router>
    );
  };

  const renderApp = () => {
    const app = !initializationComplete ? (
      <CenteredDiv vertical horizontal>
        <Message>Initializing...</Message>
      </CenteredDiv>
    ) : (
      router()
    );
    return app;
  };

  return renderApp();
};

export default MainRouter;
