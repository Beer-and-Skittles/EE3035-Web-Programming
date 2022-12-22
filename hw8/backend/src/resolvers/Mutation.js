import {v4 as uuidv4} from 'uuid';
import ChatBoxModel from '../models/chatbox.js'

const makeName = (name, to) => {
  return [name, to].sort().join('_');
}

const checkOutChatBox = async (name, to) => {
  const chatBoxName = makeName(name, to);
  // console.log('10',chatBoxName)
  const existChatBox = await ChatBoxModel.findOne({name: chatBoxName});
  if (existChatBox !== null)  return existChatBox;
 
  // console.log('not fsound');
  const newChatBox = new ChatBoxModel({name: chatBoxName, messages:[]});
  try { await newChatBox.save();}
  catch (e) {throw new Error ('Message DB save error: ' + error);}
  return newChatBox
}

const Mutation = {
  createChatBox: async (parent, {name1, name2}, {pubsub}) => {
    // console.log('createChatBox with names:',name1, name2);
    return checkOutChatBox(name1, name2);
  },
  createMessage: async (parent, {name, to, body}, {pubsub}) => {
    // console.log('createMessage:',name, to, body);
    const chatBox = await checkOutChatBox(name, to);
    const newMsg = {sender: name, body: body};
    chatBox.messages.push(newMsg);
    await chatBox.save();
    // console.log(newMsg);
    const chatBoxName = makeName(name, to);
    // console.log('chatBoxName');
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: {
        sender: name,
        body: body,
      },
    });
    return newMsg;
  },
};

export { Mutation as default }