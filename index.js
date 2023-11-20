const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const {userRouter} = require("./routes/userRoute.js")

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = process.env.MONGODB_URI;


// Define your routes here
app.get("/",(req,res)=>{
    res.send("welcome to NewDigitalEasy")
})

app.use("/users",userRouter)

// Start the server
app.listen(port, async () => {
    try {
        mongoose.connect(dbURI)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
            });

    } catch (error) {
             console.log(error.message)
    }
    console.log(`Server is running on port ${port}`);
});