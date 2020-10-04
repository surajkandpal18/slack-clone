import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  chatHeader: {
    borderBottom: "1px solid black",
    padding: "1em",
    paddingRight: "0",

    zIndex: 5,
  },
}));
function ChatHeader({ name }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.chatHeader} alignItems="center">
      <Grid item container sm alignItems="center">
        <Grid item>
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ fontWeight: "bold" }}
          >
            #{name}
          </Typography>
        </Grid>
        <Grid item style={{ margin: "0.5em", marginBottom: "0.1em" }}>
          <StarBorderIcon />
        </Grid>
      </Grid>
      <Grid item container sm justify="flex-end" alignItems="center" style={{marginRight:'1em'}}>
        <Grid item style={{ margin: "0.5em", marginBottom: "0.1em" }}>
          <InfoOutlinedIcon style={{ fontSize: "1rem" }} />
        </Grid>
        <Grid item >
          <Typography variant="caption" style={{ color: "grey" }}>
            Details
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChatHeader;
