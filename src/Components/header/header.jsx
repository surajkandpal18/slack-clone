import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useStateValue } from "../context/state-provider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function Header() {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  return (
    <div>
      <AppBar position="fixed" style={{ zIndex: 11 }} elevation={0}>
        <Toolbar disableGutters>
          <Avatar src={user.photoURL} style={{ marginLeft: "0.7em" }} />
          <IconButton style={{ marginLeft: "auto" }}>
            <ExitToAppIcon style={{ color: "#fff", fontSize: "1.5rem" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </div>
  );
}

export default Header;
