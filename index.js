import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';


const app = express();
//middleware for passing json request to the body
app.use(bodyParser.json());
dotenv.config();

const PORT=process.env.PORT || 8000;
const MONGOURL=process.env.MONGO_URL;

app.use('/api/user',router);


mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT,() => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
.catch((error) => {
    console.log("Error",error);
});
