import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
 import socketIO from "socket.io-client";
import "../Chat/Chat.css"
import sendlogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactSCrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"
import Emoji from '../Emoji';



let socket;
 const ENDPOINT = "https://u-chat-server.herokuapp.com/";


const Chat = () => {


    const [id, setid] = useState("");
    const [messages, setmessages] = useState([])
    const [newMessage, setnewMessage]=useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

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
            console.log(2, "fdg");
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
    if(!newMessage) return
       socket.emit('message',{message: newMessage,id});
       setnewMessage("");
       setShowEmojiPicker(false)
   }

console.log(messages);
    useEffect(() => {
      socket.on('sendMessage', (data)=>{
        setmessages([...messages,data]);
         console.log(data.user,data.message); 
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
                    <Emoji setnewMessage={setnewMessage} show={showEmojiPicker} setShow={setShowEmojiPicker}/>
                    <input onKeyPress={(event)=> event.key==='Enter'?send():null} type="text" id="chatInput" 
                        value={newMessage}
                        onChange={(e)=>setnewMessage(e.target.value)}
                    />
                    <button  onClick={send} className='sendBtn'><img src={sendlogo} alt="Send" /></button>
                    
                </div>
            </div>
        </div>
    )
}

export default Chat