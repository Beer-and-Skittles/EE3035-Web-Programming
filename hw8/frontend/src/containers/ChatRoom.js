import {useState, useEffect, useRef} from 'react';
import {Tabs, Input, Tag} from 'antd';
import styled from 'styled-components';
import {useChat} from './hooks/useChat';
import Title from '../components/Title.js';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
    background-color:blue;
`;

const ChatRoom = () => {
    const {me, messages, sendMessage, startChat, setFriend, friend, displayStatus} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [msg, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);  // set to true to update scroll
    const [modalOpen, setModalOpen] = useState(false);

    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    // input:  array of strings
    // output: html
    const displayChat = (chat) => (

        (chat.length === 0) ? (
            <p style={{color: '#ccc'}}> No messages... </p>
        ) : (
            <ChatBoxWrapper>{
                chat.map (({name, to, body},i) => 
                (
                    <Message isMe={name === me} message={body} key={i}/>
                ))}
                <FootRef ref={msgFooter}/>        
            </ChatBoxWrapper>
        )
    );
    
    const extractChat = (friend) => {
        return displayChat(messages.filter (({name, to, body}) => (((name === friend && to === me) || (name === me && to === friend)))));
    }

    const createChatBox = async (friend) => {
        // some function: returns true if an element fits the description
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,
        {label: friend, children: chat, key: friend}]);
        await startChat({
            variables:{
                name1:me,
                name2:friend,
            },
        });
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);
    }
 
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView();
    }
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    useEffect(() => {
        let newChatBoxes = chatBoxes;
        for(let i=0; i<chatBoxes.length; i++){
            const filtered_messages = messages.filter (({name, to, body}) => (((name === chatBoxes[i].key && to === me) || (name === me && to === chatBoxes[i].key))));
            let res = filtered_messages.map(({name, body}) => {
                return( <Message isMe={name === me} name={name} message={body} />);
            })
            newChatBoxes[i].children = [res]
        }
        setMsgSent(true);
        setChatBoxes(newChatBoxes);
    }, [messages])

    return(
        <div>
            <Title name={me}/>
            <div>
                <ChatBoxesWrapper
                    tabBarStyle={{height: '36px'}}
                    type='editable-card'
                    activeKey={activeKey}
                    onChange={async (key) => {
                    
                        setActiveKey(key);
                        setFriend(activeKey);
                        // console.log('119:',activeKey, typeof(activeKey));
                        extractChat(key);
                        // console.log('createChat');
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true);
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                            setFriend(activeKey);
                            // console.log('132:',activeKey, typeof(activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({name}) => {
                        setActiveKey(createChatBox(name));
                        setFriend(name);
                        // console.log('142:',name, typeof(activeKey));
                        extractChat(name);
                        setModalOpen(false);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                />
            </div>
            <Input.Search
                value = {msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton= 'Send'
                placeholder = 'Type a message here...'
                onSearch={async (msg) => {
                    if(!msg){
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message.'
                        })
                        return;
                    }else if (activeKey === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.',
                        });
                        setMsg('');
                        return;
                    }
                    // console.log('activeKey: ',activeKey, typeof(activeKey),typeof(friend));
                    await sendMessage({
                        variables: {
                            name:me,
                            to:friend,
                            body:msg,
                        },
                    });
                    // console.log('message sent');
                    setMsg('')
                    setMsgSent(true);
                }}
            />
        </div>
    );

}

export default ChatRoom;