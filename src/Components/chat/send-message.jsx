import React,{useRef, useState} from 'react'
import db from '../firebase/firebase';
import firebase from 'firebase'
import { Button, IconButton, makeStyles, TextField } from '@material-ui/core';
import { useStateValue } from '../context/state-provider'
import SendIcon from '@material-ui/icons/Send';
import { Email } from '@material-ui/icons';

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
const sendButtonRef = useRef(null)

    const handleSendMessage=()=>{
     if(message.trim()!==''){   db.collection('rooms').doc(roomId).collection('messages').add({
            displayName:user.displayName,
            photoUrl:user.photoURL,
            message:message,
            time:firebase.firestore.FieldValue.serverTimestamp(),
            email:user.email
        }
        ).then(()=>{
            setMessage('')
            document.getElementById('lastMessage').scrollIntoView()
        }).catch(err=>{
            console.log(err)
        })}
    }

    return (
        <div style={{position:'fixed' ,width:'100%',display:'flex',zIndex:5,bottom:'0',backgroundColor:'#fafafa',paddingBottom:'0.5em',paddingTop:'1em'     ,marginLeft:'auto',marginRight:'auto'}}>
            <TextField variant='outlined' placeholder='Send Message'  value={message} className={classes.messageBox} onChange={(e)=>setMessage(e.target.value)}  
            onKeyPress= {(e) => {
                if (e.key === 'Enter') {
                 sendButtonRef.current.click()
                  // write your functionality here
                }}
        }/>
            <IconButton onClick={handleSendMessage} color='primary' ref={sendButtonRef}><SendIcon color='primary'/></IconButton>
        </div>
    )
}

export default SendMessage
