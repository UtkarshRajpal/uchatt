import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import "./Emoji.css" 
import {FaRegSmile} from 'react-icons/fa' 

const Emoji = ({setnewMessage}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [show, setShow] = useState(false)

  const onEmojiClick = (event, emojiObject) => {
    setnewMessage((prevMssg) => prevMssg + emojiObject.emoji);
  };

  return (
    <div className='emojiBox'>
        <FaRegSmile
        className='EmojiIcon'
            size="1.5em"
            onClick={() => setShow(!show)}
        />
        {show && (
            <div style={{ position:"relative"}}>

            <div className='emojiPicker'>
                <Picker onEmojiClick={onEmojiClick} />
            </div>
            </div>
        )}
    </div>
  );
};

export default Emoji;