import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import slackLogo from "../../assets/slack_logo.svg";
import { provider } from "../firebase/firebase";
import firebase from "firebase/app";
import { useStateValue } from "../context/state-provider";
import { actionTypes } from "../context/reducer";
function SignIn() {
  const theme = useTheme();
  const [{ user }, dispatch] = useStateValue();
  const matchXs=useMediaQuery(theme.breakpoints.down('xs'))

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        //console.log(data);
        dispatch({
          type: actionTypes.SET_USER,
          payload: data.user,
        });
      })
      .catch((error) => console.error("error has occured " + error));
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ width: "100vw", height: "100vh" }}
      spacing={2}
    >
      <Grid item>
        <img src={slackLogo} alt="slackLogo" style={{ width: "10em" }} />
      </Grid>
      <Grid item>
        <Typography variant="h3" style={{ fontWeight: "bold",textAlign:'center' }} gutterBottom textAlign='center'>
          Let's Find your team
        </Typography>
        </Grid>
        <Grid item container>
        <Typography
          variant="subtitle"
          style={{ color: "#454245",marginLeft:'auto',
          marginRight:'auto', }}
          align='center'
          gutterBottom
        >
          Start by choosing the Google account that you use for work
        </Typography>
      </Grid>
      <Grid item container style={{ marginTop: "1em" }} container>
        <Button
          variant="outlined"
          style={{
            color: theme.palette.common.googleBlue,
            borderColor: theme.palette.common.googleBlue,
            textTransform: "none",
            borderWidth: "2px",
            fontWeight: 900,
marginLeft:'auto',
marginRight:'auto',
            width:matchXs?'16em': "22em",
            fontSize:matchXs?'14px':"18px",
          }}
          onClick={handleLogin}
        >
          Continue with Google
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignIn;
