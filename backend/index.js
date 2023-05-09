const express=require('express')
require('dotenv').config()
const app = express()
const mongoose=require('mongoose')
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.connect(process.env.CONNECTION_STRING ,
    {
      useNewUrlParser : true,
      useUnifiedTopology : true
    }
  )

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',function(){
    console.log('database connected successfully ...')
})

app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/",(req,res) =>{
   res.send("welcome to homepage")
})
app.get("/users", (req, res)=>{
    res.send('welcome to user page')
})

app.listen(process.env.PORT , ()=> {
    console.log(`app listing on port ${process.env.PORT}`);
})