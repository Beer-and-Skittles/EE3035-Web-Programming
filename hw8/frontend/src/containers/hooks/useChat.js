import {createContext, useContext, useEffect, useState} from 'react';
import {message} from 'antd';
import {useQuery, useMutation} from '@apollo/client';
import {CHATBOX_QUERY, CREATE_CHATBOX_MUTATION
, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION} from '../../graphql'
import { TypeOrFieldNameRegExp } from '@apollo/client/cache/inmemory/helpers';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    friend:"",
    signedIn: false,
    messages: [],
    // startChat: () => {},
    sendMessage: () => {},
    displayStatus: () => {},
});

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);
    const [friend, setFriend] = useState('');
    const [messages, setMessages] = useState([]);

    const { data, loading, subscribeToMore } =
    useQuery (CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend,
        },
    });
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {from: me, to:friend},
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    // console.log('newMessage is',newMessage);
                    // console.log('prev',prev.chatbox);
                    return {
                        chatbox: {
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                },
            });    
        } catch (e) {
            console.log(e)
        }
    }, [subscribeToMore]);
    
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
                setFriend,
                friend,
                setSignedIn,
                startChat,
                sendMessage,
                // clearMessages,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat}