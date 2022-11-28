import {MessageModel, ChatBoxModel, UserModel} from './models/chatbox.js';

const broadcastData = (data, wss) => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(data));
    })
}

const sendChat = (payload, ws) => {
    ws.send(JSON.stringify(['chat',payload]));
}

const sendStatus = (payload, ws) => {
    ws.send(JSON.stringify(['status',payload]));
}

const makeName = (name,to) => {
    return [name, to].sort().join('_');
};

export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {

                // payload => {name, to}
                case 'chat': {                          
                    const msg_models = await MessageModel.find({$or: [{sender:payload.name, to:payload.to},{sender:payload.to, to:payload.name}]});
                    let msgs = [];
                    for (let i=0; i<msg_models.length; i++){
                        if (msg_models[i].sender === payload.name){
                            msgs.push({name: payload.name, to: payload.to, body: msg_models[i].body});
                        }else if (msg_models[i].sender === payload.to){
                            msgs.push({name: payload.to, to: payload.name, body: msg_models[i].body});
                        }
                    }
                    sendChat(msgs,ws);
                    break;
                }

                // payload => {name, to, body}
                case 'message': {   
                   
                    const chatbox_name = makeName(payload.to, payload.name);

                    // new message model
                    const this_message = new MessageModel({sender: payload.name, to:payload.to, body:payload.body});
                    try { await this_message.save();}
                    catch (e) {throw new Error ('Message DB save error: ' + error);}

                    // new or update chatbox
                    let this_chatbox = await ChatBoxModel.findOne({name: chatbox_name});
                    if(this_chatbox){
                        await ChatBoxModel.updateOne({name : chatbox_name},{$push :{messages: this_message._id}});
                    }else{
                        this_chatbox = new ChatBoxModel({name: chatbox_name, messages:[this_message._id]});
                        try { await this_chatbox.save();}
                        catch (e) {throw new Error ('Message DB save error: ' + error);}
                    }
                    
                    broadcastData(['output', {name: payload.name, to:payload.to, body:payload.body}],wss)
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws);
                    break;
                }  

                // payload => null
                case 'clear': {     
                    break;
                }
                default: break
            }
        }
    )
}