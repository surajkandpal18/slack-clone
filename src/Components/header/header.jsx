import {
  AppBar,
  Avatar,
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
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
  searchBox:{
    width:'35em',
        '& .MuiFilledInput-root':{
      backgroundColor:'rgba(250,250,250,0.3)'
    }
  }
}));

function Header() {
  const classes = useStyles();
  const [{ user }] = useStateValue();

  return (
    <div>
      <AppBar position="fixed" style={{ zIndex: 11 }} elevation={0}>
        <Toolbar disableGutters>
          <Avatar src={user.photoURL} style={{ marginLeft: "0.7em" }} />
        <TextField variant='filled'  style={{marginLeft:'auto',marginRight:'auto'}} placeholder='Type something' className={classes.searchBox} 
        InputProps={{
          startAdornment:
          <InputAdornment position="start">
         
              <SearchIcon color='primary'/>
        
          </InputAdornment>
        }}/>
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
