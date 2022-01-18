const cors= require('cors');
const mongoose= require("mongoose");
const express= require('express');
const PORT= process.env.PORT || 3000

require("dotenv").config();

const authRoutes= require('./routes/auth');
const memeRoutes= require('./routes/meme');
const imageRoutes= require('./routes/images');


const app= express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res)=> {
  res.send("Up and running")
})

app.use('/api/auth', authRoutes);
app.use('/api/meme', memeRoutes);
app.use('/api/images/', imageRoutes);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=> {
        app.listen(PORT, ()=> {
            console.log(`Server started on PORT ${PORT}`)
        })
    })
    .catch((err)=> {
        console.log(err)
        process.exit(1)
})

const server= app;
module.exports= server;