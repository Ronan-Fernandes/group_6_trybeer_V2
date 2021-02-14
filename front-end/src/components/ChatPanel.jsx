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
        window.socket.off('SendAllMessages',);
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
    <div className="container container_chat">
      <div className="" >
        {allMessages.map((chat, index) => (
          <div key={index} className="chatMessage_card my-5">
            <div className="row justify-content-start mb-2">
              <span className="mr-2" data-testid="nickname">{chat.nickname}</span>
              <span data-testid="message-time">{chat.time}</span>
            </div>
            <div className="chatMessage_card_text">
              <span className="p-3" data-testid="text-message">{chat.text}</span>

            </div>
          </div>
        ))}
      </div>

      <div className="container fixed-bottom sendMessage-container ">
        <form className="form-inline p-3">
          <label className="sr-only" for="inlineFormInputMsg" htmlFor="message">
            Your message
              </label>
          <input
            className="form-control  mr-sm-2"
            for="inlineFormInputMsg"
            name="message"
            type="text"
            data-testid="message-input"
            placeholder="Digit seu mensagem"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            // className="btn btn-primary "
            className="btn btn_send"
            data-testid="send-message"
            type="button"
            onClick={handleClick}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
