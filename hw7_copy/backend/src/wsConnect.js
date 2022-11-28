import Message from './models/message.js';

const sendData = (data, ws) => {
    console.log('send data');
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws);
}

export default {
    initData: (ws) => {
        Message.find().sort({created_at: -1}).limit(100)
            .exec((err, res) => {
                console.log(res);
                if (err) throw err;
                sendData(["init", res], ws);
            });
    },

    onMessage: (ws) => (
        // (byteString) => {
        async (byteString) => {
            console.log('on message')
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            console.log('onMessage print data',task, payload);
            switch (task) {
                case 'clear': {
                    Message.deleteMany({},() => {
                        sendData(['cleared'], ws)
                        sendStatus({type:'info', msg: 'Message cache cleared.'}, ws)
                    })
                    break;
                }
                case 'input': {
                    const {name, body} = payload

                    // save payload to db
                    const message = new Message({name, body})
                    // try { message.save();}
                    try { await message.save();}
                    catch (e) {throw new Error
                    ("Message DB save error: "+error)}

                    // respond to client
                    sendData(['output', [payload]], ws)
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws)
                    break
                }
                default: break
            }
        }
    )
}