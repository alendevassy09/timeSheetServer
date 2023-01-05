var express=require("express")
const cors = require('cors')
const logger = require("morgan");
var admin=require('./Routes/Admin')
const cookieParser = require("cookie-parser");
var db=require('./connection')
var app=express()
var compression = require("compression");
app.use(cors())
 db.connect()
app.use(compression());
app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/admin',admin)
app.listen(4000,()=>{
    console.log("server started");
})