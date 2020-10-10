import {
  AppBar,
  Avatar,
  Hidden,
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useStateValue } from "../context/state-provider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { actionTypes } from "../context/reducer";


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  searchBox:{
    width:'35em',
  
    '& .MuiFilledInput-input':{
      padding: '18px 10px 10px',
    },
    
        '& .MuiFilledInput-root':{
         
      backgroundColor:'rgba(250,250,250,0.3)'
    },
    marginLeft:'auto',
    marginRight:'auto',
   
    [theme.breakpoints.down('sm')]:{
      width:'20em',
    
    },
    [theme.breakpoints.down('xs')]:{
      width:'15em',
      marginLeft:'1em',
    }
  }
}));

function Header() {
  const classes = useStyles();
  const [{ user,drawer },dispatch] = useStateValue();
  const theme=useTheme()
const matchSm=useMediaQuery(theme.breakpoints.down('sm'))
const matchXs=useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div>
      <AppBar position="fixed" style={{ zIndex: 11 }} elevation={0}>
        <Toolbar disableGutters>
        
        {matchXs?<IconButton onClick={()=>{
          dispatch({
            type:actionTypes.SET_DRAWER,
            payload:true,
          })
        }}>
        <MenuIcon style={{color:'#fff'}}/>
        </IconButton>:null}
  
          <Avatar src={user.photoURL} style={{ marginLeft: "0.7em" }} />
        <TextField variant='filled' placeholder='Type something' className={classes.searchBox} 
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
