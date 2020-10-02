import React,{useState} from 'react'
import db from '../firebase/firebase';
import firebase from 'firebase'
import { Button, IconButton, makeStyles, TextField } from '@material-ui/core';
import { useStateValue } from '../context/state-provider'
import SendIcon from '@material-ui/icons/Send';

const useStyles=makeStyles((theme)=>({
messageBox:{
    width:'70vw',
    margin:'1em',
    marginBottom:0,
    marginTop:0,
    '& .MuiOutlinedInput-root':{
        borderRadius:'30px'
    }
}
}));

function SendMessage({roomId}) {
    const [message,setMessage]=useState('');
    const [{user}]=useStateValue()
    const classes=useStyles()

    const handleSendMessage=()=>{
     if(message.trim()!==''){   db.collection('rooms').doc(roomId).collection('messages').add({
            displayName:user.displayName,
            photoUrl:user.photoURL,
            message:message,
            time:firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err=>{
            console.log(err)
        })}
    }

    return (
        <div style={{position:'fixed' ,display:'flex',zIndex:5,bottom:'0',backgroundColor:'#fff',marginLeft:'auto',marginRight:'auto'}}>
            <TextField variant='outlined' placeholder='Send Message'  value={message} className={classes.messageBox} onChange={(e)=>setMessage(e.target.value)}/>
            <IconButton onClick={handleSendMessage} color='primary'><SendIcon color='primary'/></IconButton>
        </div>
    )
}

export default SendMessage
