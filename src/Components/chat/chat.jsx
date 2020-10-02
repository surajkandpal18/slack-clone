import React, { useEffect, useState } from "react";

//import { makeStyles } from "@material-ui/styles";

import ChatHeader from "./chat-header";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "../firebase/firebase";
import ChatMessage from "./chat-message";

//const useStyles = makeStyles((theme) => ({}));

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data());
          setRoomDetails(snapshot.data());
        });
    }
  }, [roomId]);

  console.log(roomDetails);
  return (
    <Grid container direction="column">
      <Grid item>
        <ChatHeader name={roomDetails?.name} />
      </Grid>
      <Grid item>
        <ChatMessage />
      </Grid>
    </Grid>
  );
}

export default Chat;
