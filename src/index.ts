require('dotenv').config();
import "./database";
import "./util/logger";
import "./helper/jwt";
import express from "express";
import { json } from "body-parser";
import { generateToken, verifyToken } from "./helper/jwt";

const app = express();

app.use(json());


app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}.`);
});

 const token  = generateToken({
     dateCreated: new Date().getTime(),
     username: "test"
 });

const {type, session} =  verifyToken(token);
console.log(type);
console.log(session?.issued);
