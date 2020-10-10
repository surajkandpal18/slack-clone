import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStateValue } from "./Components/context/state-provider";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import SignIn from "./Components/login/sign-in";
import { myTheme } from "./Components/theme/theme";
import firebase from "firebase";

import { actionTypes } from "./Components/context/reducer";
import Chat from "./Components/chat/chat";
import Header from "./Components/header/header";
import Sidebar from "./Components/sidebar/sidebar";
import "./index.css";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((myuser) => {
      console.log(myuser);
      if (myuser) {
        dispatch({
          type: actionTypes.SET_USER,
          payload: myuser,
        });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <div className="App" style={{
        overflowY:'hidden'
      }}>
        {user === null ? (
          <Route exact path="/" component={SignIn} />
        ) : (
          <>
            <Header />
            <Grid container style={{ width: "100%",height:'90.1vh' ,overflowY:'hidden'}}>
              <Grid item style={{ margin: 0 }}>
                <Sidebar />
              </Grid>
              <Grid item container sm style={{ margin: 0 }}>
                <Route exact path="/rooms/:roomId" component={Chat} />
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
