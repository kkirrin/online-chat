import React, { useEffect, useState } from 'react'
import styles from '../style/Chat.module.css'

import  io  from 'socket.io-client'
import emojies from '../img/emoji.svg'
import {useLocation, useNavigate} from 'react-router-dom'

import EmojiPicker from 'emoji-picker-react'
import Messages from './Messages'

const socket = io.connect('https://online-chat-server-y5xf.onrender.com')

const Chat = () => {
  const navigate = useNavigate()
  const {search} = useLocation()
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([])
  const [message, setMessage] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState(0)
  
  useEffect(() => {
    
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data])
    })
  }, [])
  

  useEffect(() => {
    socket.on('room', ({ data: {users}}) => {
      setUsers(users.length)
    })
  }, [])

  const leftRoom = () => {
    socket.emit('leftRoom', {params})
    navigate('/')
  }
  const handleChange = ({ target: { value } }) => setMessage(value);
  const onEmojiClick = ({ emoji }) => {setMessage(`${message} ${emoji}`)}

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
      <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>Участников: {users}</div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={state} name={params.name}/>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}> 
          <input 
            type='text' 
            placeholder='What do you want to say?'
            name='room' 
            value={message} 
            className={styles.input} 
            onChange={handleChange} 
            autoComplete='off'
            required
            />
         </div>

        <div className={styles.emoji}>
            <img src={emojies} alt='' onClick={() => {setIsOpen(!isOpen)}} />

            {isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )} 
            
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
         
      </form>
    </div>
  )
}

export default Chat