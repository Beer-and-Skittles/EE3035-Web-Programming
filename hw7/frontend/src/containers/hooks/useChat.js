import {createContext, useContext, useEffect, useState} from 'react';
import {message} from 'antd';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessage: () => {},
    displayStatus: () => {},
});

const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log('Backend socket server connected!');


const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    
    // what should be done if client recieves message
    client.onmessage = (byteString) => {
        const {data} = byteString
        const [type, payload] = JSON.parse(data);
        console.log(type);
        switch (type) {
            case 'chat' : {
                console.log('CHAT RECEIVED');
                setMessages(payload);
                break;
            }
            case 'output': {                
                setMessages(() => [...messages, {name: payload.name, to: payload.to, body: payload.body}]);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            default:{
                break;
            };
        }
    }

    const startChat = (name, to) => {
        if(!name || !to) throw new Error('Name or to required.');
        sendData(['chat',{name,to}])
    }

    const sendMessage = ({name, to, body}) => {
        if (!name || !to || !body)
            throw new Error('name or to or body required');
        sendData(['message',{name, to, body}]);
    };
    
    const sendData = async(data) => {
        await client.send(JSON.stringify(data));
    };

    const clearMessages = () => {
        sendData(['clear',null])
    };

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
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);

    return(
        <ChatContext.Provider
            value = {{
                status,
                me,
                signedIn,
                messages,
                setMe,
                setSignedIn,
                startChat,
                sendMessage,
                clearMessages,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat}