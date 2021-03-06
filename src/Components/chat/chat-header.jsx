import React from "react";

import { Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  chatHeader: {

    padding: "1em",
    paddingRight: "0",

    zIndex: 5,
  },
}));
function ChatHeader({ name }) {
  const classes = useStyles();
  return (
    <Card elevation={3} style={{zIndex:5}}>
    <Grid container className={classes.chatHeader} alignItems="center">
      <Grid item container xs alignItems="center">
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
      <Grid item container xs justify="flex-end" alignItems="center" style={{marginRight:'1em'}}>
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
    </Card>
  );
}

export default ChatHeader;
