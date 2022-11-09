import './App.css'
import { Button, Input, message, Tag } from 'antd'
import useChat from './useChat'
import {useEffect, useState} from 'react'

function App() {

  const {status, messages, sendMessage} = useChat();  // import from useChat.js
  const [username, setUsername] = useState('');       // local state variables from message input
  const [body, setBody] = useState('');               // local state variables from message input

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
        <Button type="primary" danger >
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
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}   // save and store the username
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        value={body}
        onChange={(e) => setBody(e.target.value)}       // save and store the textBody
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {                            // when 'send' call sendMessage()
          sendMessage({name:username, body:msg})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
