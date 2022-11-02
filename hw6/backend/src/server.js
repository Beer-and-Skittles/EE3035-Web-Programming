import express from 'express'
import cors from 'cors'
import {router} from './routes/index.js'
import db from './db.js'

db.connect();

const app = express();
app.use(cors());
app.use(express.json())
app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);