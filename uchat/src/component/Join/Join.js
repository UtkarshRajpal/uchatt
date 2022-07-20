import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import {Link, useNavigate} from "react-router-dom";

let user;

const Join = () => {

  const [name, setname] = useState("");
  const navigate = useNavigate();

  const sendUser=()=>{
    if (!name) return
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";

    navigate('/chat')
  }
  return (
    <div className='JoinPage'>
        <div className='joinContainer'>
            <img src={logo} alt="logo" />
            <h1>U CHAT</h1>
            <input  
            onChange={(e)=>setname(e.target.value)}
            onKeyPress={(event)=> event.key==='Enter'?sendUser():null}
            placeholder="Enter your Name" type="text" id="joinInput"  />

            <button onClick={sendUser} className='joinBtn'>JOIN</button>
        </div>
    </div>
  )
}

export default Join
export {user}