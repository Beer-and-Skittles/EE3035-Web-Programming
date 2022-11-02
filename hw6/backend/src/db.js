import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

export default {
    connect: () => {
        dotenv.config();
        mongoose
            .connect(
                'mongodb+srv://Jessica:hw6@cluster0.8e5lffk.mongodb.net/?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((res) => console.log("mongo db connection created"));  
    }
}

