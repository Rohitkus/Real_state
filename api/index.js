import express from "express"
import { cpSync } from "fs"
const app=express();



app.listen(3000,()=>{console.log(
    "server is running on the port : 3000"
)})