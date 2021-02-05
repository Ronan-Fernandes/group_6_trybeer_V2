import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ChatPanel.css';

const ChatPanel = (props) => {
  const { email } = useSelector((state) => state.userReducer.user);
  const { userId, chatUser } = props;


  // Set all local Action/Reducers
  const [message, setMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const sliceMinus2 = -2;

  // window.socket.on('connection', () => { });

  useEffect(() => {
    window.socket = window.io('http://localhost:3001', {
      query: {
        clientId: userId,
      },
    });
    window.socket.emit('getAllMessages', userId);
    window.socket.on('SendAllMessages', (payload) => {
      console.log("SendAll message received");
      if (payload.allChats.length > 0) {
        const messagesHistory = payload.allChats[0].messages;
        setAllMessages([...messagesHistory]);
      }
      return () => {
        window.socket.off('SendAllMessages', );
      };
    });

  }, []);




  function handleClick(event) {
    event.preventDefault();
    const today = new Date();
    const hours = (`0${today.getHours()}`).slice(sliceMinus2); // Add 0 if hour <10
    const minutes = (`0${today.getMinutes()}`).slice(sliceMinus2); // Add 0 if min <10
    const time = `${hours}:${minutes}`;
    setAllMessages([...allMessages, { nickname: chatUser, text: message, time }]);
    setMessage('');
    window.socket.emit('message', {
      text: message,
      time,
      nickname: chatUser,
    }, userId);
  }

  return (
    <>
      <h1>WebChat CLIENT </h1>
      <div>
        {allMessages.map((chat, index) => (
          <div key={index} className="chatMessage_card">
            <h3 data-testid="nickname">{chat.nickname}</h3>
            <h2 data-testid="message-time">{chat.time}</h2>
            <h2 data-testid="text-message">{chat.text}</h2>
          </div>
        ))}
      </div>
      <div className="globalContainer">
        <form className="formContainer">
          <label htmlFor="message">
            Your message
            <input
              name="message"
              type="text"
              data-testid="message-input"
              placeholder="Digit seu mensagem"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <button
            data-testid="send-message"
            type="button"
            onClick={handleClick}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPanel;
