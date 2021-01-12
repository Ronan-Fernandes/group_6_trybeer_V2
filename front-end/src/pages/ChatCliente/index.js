import React from 'react';
import ChatPanel from '../../components/ChatPanel';
import Header from '../../components/Header';

const two = 2;

const ChatClient = () => {
<<<<<<< HEAD
  return (
    <>
    <Header />
      <ChatPanel />
=======
  const { email } = useSelector((state) => state.userReducer.user);

  // Set all local Action/Reducers
  const [message, setMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  window.socket = window.io('http://localhost:3001', {
    query: {
      clientId: email,
    },
  });

  window.socket.on('connection', () => {});

  function handleClick(event) {
    const today = new Date();
    const hours = `0${today.getHours()}`.slice(-two); // Add 0 if hour <10
    const minutes = `0${today.getMinutes()}`.slice(-two); // Add 0 if min <10
    const time = `${hours}:${minutes}`;
    setAllMessages([...allMessages, { user: email, text: message, time }]);
    setMessage('');
    event.preventDefault();
  }

  return (
    <>
      <h1>WebChat CLIENT </h1>
      <div>
        {allMessages.map((messages) => (
          <>
            <h3 data-testid="nickname">{messages.user}</h3>
            <h2 data-testid="message-time">{messages.time}</h2>
            <h2 data-testid="text-message">{messages.text}</h2>
          </>
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
              value={ message }
              onChange={ (event) => setMessage(event.target.value) }
            />
          </label>
          <button
            data-testid="send-message"
            type="button"
            onClick={ handleClick }
          >
            Send
          </button>
        </form>
      </div>
>>>>>>> master
    </>
  );
};

export default ChatClient;
