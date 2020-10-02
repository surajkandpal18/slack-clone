import { Avatar, ListItem, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useStateValue } from "../context/state-provider";

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
function ChatOption({ message, photoUrl, displayName, time }) {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  return (
    <div className={classes.messageContainer}>
      {user.displayName !== displayName ? (
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
              <div>
                <Typography variant="body2" style={{ fontWeight: "bold" }}>
                  {displayName}
                </Typography>
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
            <div>
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
              {displayName}
            </Typography>
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
    </div>
  );
}

export default ChatOption;
