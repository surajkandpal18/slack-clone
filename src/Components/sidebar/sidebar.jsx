import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useTheme } from "@material-ui/styles";
import userEvent from "@testing-library/user-event";
import { useStateValue } from "../context/state-provider";
import { Edit } from "@material-ui/icons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import db from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { actionTypes } from "../context/reducer";
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = "240px";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "20em",
    //maxWidth: drawerWidth,
    height: "100%",
    zIndex: 10,
    backgroundColor: theme.palette.primary.main,
maxHeight:'90.5vh',
    scrollbarWidth: "none",
    overflowY:'auto',
    transition:' 100ms',
    [theme.breakpoints.down('xs')]:{
     zIndex:'14',
     width:'17em',
     position:'fixed',
     top:0,
     height: "100vh",
     maxHeight:'100vh',
     transition:'500ms'
    }
  },

  nameSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    padding: 10,
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [{ user,drawer },dispatch] = useStateValue();
  const [channels, setChannels] = useState([]);
  const [channelName,setChannelName]=useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myDisplay,setMyDisplay]=useState(false);
  const [open, setOpen] = React.useState(false);

  

  const history = useHistory();
  const matchSm=useMediaQuery(theme.breakpoints.down('sm'))
  const matchXs=useMediaQuery(theme.breakpoints.down('xs'))
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      );
    });
  }, []);

  const addRooms=()=>
  {
    db.collection('rooms').add({
      name:channelName
    }).then((doc)=>handleDialogClose())

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose=()=>{
    setOpen(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <div className={classes.drawer} style={{width:matchXs?drawer===true?'17em':'0':'20em'}}>
        <div>
          <div className={classes.nameSpace}>
            <div>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Slack Clone
              </Typography>

              <div className={classes.nameSpace}>
                <div>
                  <FiberManualRecordIcon
                    style={{
                      color: "green",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <Typography variant="subtitle2" style={{ color: "#fff" }}>
                    {user.displayName}
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <IconButton
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  margin: "10px",
                }}
              >
                <Edit
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "1.2rem",
                  }}
                />
              </IconButton>
            </div>
           { matchXs?<div>
            <IconButton onClick={()=>{
              dispatch({
                type:actionTypes.SET_DRAWER,
                payload:false
              })
            }}>
            <ArrowBackIosIcon style={{color:'#fff'}} />
            </IconButton>
            </div>:undefined}
          </div>
        </div>
        <Divider style={{ backgroundColor: theme.palette.primary.light }} />
        <List>
          {[
            "Threads",
            "Mentions & Reactions",
            "Saved Items",
            "Channel Browser",
            "People & user groups",
            "Apps",
            "File Browser",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon style={{ color: "#fff" }} />
                ) : (
                  <MailIcon style={{ color: "#fff" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} style={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
        <Divider style={{ backgroundColor: theme.palette.primary.light }} />
        <List
          subheader={
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div
              style={{
                color: "#fff",
                marginLeft: "none",
                textAlign: "left",
                padding: "1em",
              }}
            >
              Channels
            </div>
            <div style={{marginRight:'1em'}}>
              <AddIcon style={{color:'#fff' ,cursor:'pointer'}} onClick={handleClickOpen}/>
            </div>
            </div>
            
          }
          style={{ backgroundColor: theme.palette.primary.main }}
        >
        
          {channels.map((item, index) => (
            <ListItem
              button
              key={item.name}
              onClick={() => {history.push("/rooms/" + item.id)
              dispatch({
                type:actionTypes.SET_DRAWER,
                payload:false
              })}}
            >
              <ListItemText
                primary={`# ${item.name}`}
                style={{ color: "#fff" }}
              />
            </ListItem>
          ))}
        </List>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClickOpen();handleClose()}}>Add Channel</MenuItem>
        <MenuItem onClick={handleClose}>Delete Channel</MenuItem>
        
      </Menu>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the channel to be added
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            type="channelName"
            value={channelName}
            onChange={(e)=>setChannelName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" style={{textTransform:'none'}}>
            Cancel
          </Button>
          <Button onClick={addRooms} color="primary" style={{textTransform:'none'}}>
            Add Channel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Sidebar;
