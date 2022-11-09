import {useState} from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    
    const client = new WebSocket('ws://localhost:4000');
    const snedData = async (data) => {
        await client.send(JSON.stringify(data));
        // data sent thru internet is treated as byte string, therefore must be stringified
    };


    const sendMessage = (payload) => {
        // ws_client.sendData(type,payload)
        snedData(['input',payload]);    
        setMessages([...messages,payload])
        console.log('here');
        setStatus({
            type: "success",
            msg: "Message sent."
        });
        console.log(payload);
    }
    return {
        status, messages, sendMessage
    };
};

export default useChat