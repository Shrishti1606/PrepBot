require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "https://prepbot-k3yqyqlxs-shrishtid06-4063s-projects.vercel.app"],
    credentials: true
}));

/*require all routes*/
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes') 


app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);





module.exports = app;