import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase/firebase";
import ChatOption from "./chat-option";

const useStyles = makeStyles((theme) => ({
  myMessages: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
}));

function ChatMessage() {
  const { roomId } = useParams();
  const [message, setMessages] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  return (
    <div className={classes.myMessages}>
      {message?.map((item) => (
        <ChatOption
          displayName={item.displayName}
          photoUrl={item.photoUrl}
          message={item.message}
          time={item.time}
        />
      ))}
    </div>
  );
}

export default ChatMessage;