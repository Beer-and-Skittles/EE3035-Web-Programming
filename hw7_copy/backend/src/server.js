import express from 'express'
import mongoose from 'mongoose'
import mongo from './mongo'
import http from 'http'
import WebSocket from 'ws'
import wsConnect from './wsConnect'

mongo.connect()

const app = express();
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB connected!');
    wss.on('connection', (ws) => {
        wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(ws);
        // ws.onmessage = async (byteString) => {
        //     console.log('on message');
        // }
    });
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {console.log(`Example app listening on port ${PORT}!`)});