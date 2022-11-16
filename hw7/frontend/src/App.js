import './App.css'
import { Button, Input, message, Tag } from 'antd'
import useChat from './useChat'
import {useEffect, useRef, useState} from 'react'

function App() {

  const {status, messages, sendMessage, clearMessages} = useChat();  // import from useChat.js
  const [username, setUsername] = useState('');       // local state variables from message input
  const [body, setBody] = useState('');               // local state variables from message input
  const bodyRef = useRef(null);

  const displayStatus = (s) => {
    if (s.msg) {
      const {type, msg} = s;
      const content = {
        content: msg, duratoin: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)}, [status]
  )



  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages()}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{color: '#ccc'}}> No messages... </p> // initial or when cleared
        ) : (
          messages.map(({name, body}, i) => (             // print each message: {name, textBody}
            <p className="App-message" key={i}>           
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            bodyRef.current.focus();
        }}}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}   // save and store the username
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}       // save and store the textBody
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {                            // when 'send' call sendMessage()
          if (!msg || !username){
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          
          sendMessage({name:username, body:msg})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
