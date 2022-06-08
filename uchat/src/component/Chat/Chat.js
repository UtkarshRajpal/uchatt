import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
 import socketIO from "socket.io-client";
import "../Chat/Chat.css"
import sendlogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactSCrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"



let socket;
 const ENDPOINT = "https://u-chat-server.herokuapp.com/";


const Chat = () => {


    const [id, setid] = useState("");
    const [messages, setmessages] = useState([])

    useEffect(() => {
          socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {

           setid(socket.id) ;
           

        })
        console.log(socket);

        socket.emit('joined',{ user })

        socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);

        })

        socket.on('userjoined',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })

        return () => {
            socket.on('disconnect')
            socket.off();
        }
},[])

const send=()=>{
    const message = document.getElementById('chatInput').value;
       socket.emit('message',{message,id});
       document.getElementById('chatInput').value="";
   }

console.log(messages);
    useEffect(() => {
      socket.on('sendMessage', (data)=>{
        setmessages([...messages,data]);
         console.log(data.user,data.message.message); 
      })
    
      return () => {
          socket.off();
        
      }
    }, [messages])
    

    return (
        <div className='ChatPage'>
            <div className='ChatContainer'>
                <div className='header'>
                    <h2>U CHAT</h2>
                    <a href='/'> <img src={closeIcon} alt="close" /></a>
                </div>
                <ReactSCrollToBottom className='chatBox'>
                    {messages.map((item,i)=> <Message user={item.message.id===id?"":item.user} message={item.user==="Admin"?item.message:item.message.message} classs={item.message.id===id?'right':'left'} /> )}
                </ReactSCrollToBottom>
                <div className='inputBox'>
                    <input onKeyPress={(event)=> event.key==='Enter'?send():null} type="text" id="chatInput" />
                    <button  onClick={send} className='sendBtn'><img src={sendlogo} alt="Send" /></button>
                    
                </div>
            </div>
        </div>
    )
}

export default Chat