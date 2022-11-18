import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {v4} from 'uuid';

const Chat = () => {
    const navigate = useNavigate();
    const socket = useRef();
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [ currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState({
        name: 'John',
        id: v4()
    });

    const submitMessage = (e) => {
        e.preventDefault();
        socket.current = io('http://localhost:4444');
        socket.current.emit('sendMessage', { user: currentUser.name, message })
        const data = { user: currentUser.name, message }
        console.log(data);
        setMessages([...messages, { user: currentUser.name, message }]);
}

    useEffect(() => {
        if (currentUser) {
            socket.current = io('http://localhost:4444');
            socket.current.emit('addUser', currentUser.id);
            // socket.current.on('sendMessage', data => setMessages([...messages, data]));
        }
    }, [currentUser])

    useEffect(() => {

        socket.current.on('Message sent', data => {
            console.log(data)
            setMessages([...data])
            console.log(messages)
        });
    }, [])
    // console.log(currentUser, message);
  return (
      <div>
          <label htmlFor="user">
              Name: 
              <input
                  type="text"
                  id="user"
                  placeholder="User"
                  value={currentUser.name}
                  onChange={e => setCurrentUser(e.target.value)}
              />
          </label>

          <ul>
              {messages.reverse().map((message, index) =>
                  <li key={index}>
                      <b>{message.user}</b>: <em>{message.message}</em>
              </li>
              )}
          </ul>

          <form
              action=""
        //       onSubmit={e => {
        //           e.preventDefault();
        //           submitMessage(currentUser.name, message);
        //         //   setMessage([]);
        //   }}
          >
              <input
                  type="text"
                  placeholder={'Type a message ...'}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
              />
              <button type="submit" onClick={submitMessage}>Send</button>
          </form>
      </div>
  )
}

export default Chat;