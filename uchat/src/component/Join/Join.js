import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

let user;

const Join = () => {

  const [name, setname] = useState("");

  const sendUser=()=>{
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
  }
  return (
    <div className='JoinPage'>
        <div className='joinContainer'>
            <img src={logo} alt="logo" />
            <h1>U CHAT</h1>
            <input  onChange={(e)=>setname(e.target.value)} placeholder="Enter your Name" type="text" id="joinInput"  />

            <Link onClick={(event2)=>!name?event2.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinBtn'>JOIN</button></Link>
        </div>
    </div>
  )
}

export default Join
export {user}