require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database')
// const { resume, selfDescription, jobDescription } = require("./src/services/temp")
// const generateInterviewReport = require("./src/services/ai.service");  

connectDB()

// generateInterviewReport({ resume, selfDescription, jobDescription })

.then(() => {
        console.log("DB connected") // 👈 check if this prints
        app.listen(3000, () => {
            console.log('server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error("DB connection failed:", err) // 👈 or this
        process.exit(1)
    })

