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
        .collection("messages").orderBy('time')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) =>( {id:doc.id,...doc.data()})));
          document.getElementById('lastMessage').scrollIntoView()
        })
        

    }
  }, [roomId]);

  return (
    <div className={classes.myMessages}>
      {message?.map((item,index) => (
        <ChatOption
        key={index}
          displayName={item.displayName}
          photoUrl={item.photoUrl}
          message={item.message}
          time={new Date(item?.time?.toDate())}
          email={item.email}
          id={item.id}
        />
      ))}
      <div id='lastMessage' style={{margin:0,padding:0}} />
    </div>
  );
}

export default ChatMessage;
