import {useState} from 'react';
const client = new WebSocket('ws://localhost:4000');


const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    
    const sendData = async (data) => {
        // alert('sending') 
        console.log('data is',data)
        await client.send(JSON.stringify(data));
        // data sent thru internet is treated as byte string, therefore must be stringified
    };

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        console.log(task,payload)
        switch (task) {
            case 'output' : {
                setMessages([...messages, payload]);
                break;
            }
            case 'status' : {
                setStatus(payload);
                break;
            }
            case 'init' : {
                console.log("In Init")
                console.log('payload is: ',payload)
                setMessages(payload);
                break;
            } 
            case 'cleared' : {
                console.log("In Clear")
                // setMessages([]);
                break;
            }
            default: break;
        }
    }

    const clearMessages = () => {
        console.log('sending clears in the clearMessage function')
        sendData(['clear']);
    };

    const sendMessage = (payload) => {
        sendData(['input',payload]);    
    }
    return {
        status, messages, sendMessage, clearMessages
    };
};

export default useChat