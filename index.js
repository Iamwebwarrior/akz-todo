const express = require("express");
const app = express()


const mongoose = require("mongoose");
const helmet= require("helmet");
const dotenv=require("dotenv");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const listsRoute = require("./routes/lists");



dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: true 
    })
    .then(console.log("database connected"))
    .catch((err)=>console.log(err))





//middleware
app.use(express.json());  //body parser which is used whn request is made
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/lists",listsRoute);

app.use(express.static(path.join(__dirname, "/FRONTEND/build")));

app.get('*', (req, res) => { //WHNE application gets any request redirect user
  res.sendFile(path.join(__dirname, '/FRONTEND/build', 'index.html'));
});

app.get("/",(req,res)=>{
    res.send("hello there");
})


app.listen(process.env.PORT || 4000,()=>{
    console.log("backend is running");
});


