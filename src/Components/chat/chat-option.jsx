import { Avatar, ListItem, MenuItem, Paper, Typography,Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useStateValue } from "../context/state-provider";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import db from "../firebase/firebase";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "row",
  },
  messageSubContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "1em",
  },
}));
function ChatOption({ message, photoUrl, displayName, time,email,id }) {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  const { roomId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage=()=>{
    console.log(id)
    db.collection('rooms').doc(roomId).collection('messages').doc(id).delete()
  }

  return (
    <div className={classes.messageContainer}>
      {user.email !== email ? (
        <>
          <div>
            <Avatar src={photoUrl} />
          </div>
          <div className={classes.messageSubContainer}>
            <Paper
              style={{
                padding: "1em",
                borderRadius: "30px",
                borderTopLeftRadius: "0",
              }}
              elevation={5}
            >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <Typography variant="body2" style={{ fontWeight: "bold" }}>
                  {displayName}
                </Typography>
                </div>
                <div>
                <ExpandMoreIcon style={{color:'grey'}} onClick={handleClick} />
                </div>
              </div>
              <div>
                <Typography variant="body2">{message}</Typography>
              </div>
              <div>
                <Typography variant="caption" style={{ color: "grey" }}>
                  {time.toString()}
                </Typography>
              </div>
            </Paper>
          </div>
        </>
      ) : (
        <>
          <div
            className={classes.messageSubContainer}
            style={{ marginLeft: "auto" }}
          >
            <Paper
              style={{
                padding: "1em",
                borderRadius: "30px",
                borderTopRightRadius: "0",
              }}
              elevation={5}
            >
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {displayName}
              </Typography>
              </div>
              <div>
              <ExpandMoreIcon style={{color:'grey'}} onClick={handleClick} />
              </div>
            </div>
          <div>
            <Typography variant="body2">{message}</Typography>
          </div>
          <div>
            <Typography variant="caption" style={{ color: "grey" }}>
              {time.toString()}
            </Typography>
          </div>
            </Paper>
          </div>
          <div>
            <Avatar src={photoUrl} />
          </div>
        </>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleDeleteMessage();handleClose()}}>Delete Message</MenuItem>
        <MenuItem onClick={handleClose}>Forward Message</MenuItem>
        
      </Menu>
    </div>
  );
}

export default ChatOption;
