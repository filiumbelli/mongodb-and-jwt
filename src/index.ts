require('dotenv').config();
import "./database";
import "./util/logger";

import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());


app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}.`);
});

 