
const mongoose = require('mongoose');
const express= require('express');
const app = express();
app.use(express.json())
require('dotenv').config();
const{ScrapDataRoutes}=require('./routes/data.route')
app.use(ScrapDataRoutes)
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on("error", () => console.log("ERROR while connecting to DB"))  //code for connecting mongodb
db.once("open", () => {console.log("Connected to mongoDB ")
})


app.listen(8000,()=> 
console.log('Running at localhost:8000'));




// program to extract value as an array from an array of objects

