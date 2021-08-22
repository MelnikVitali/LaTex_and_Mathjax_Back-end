import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"; //to use env variables
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import router from "./router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//security Node.js / Mongo API:
app.use(mongoSanitize()); //  Prevent NoSQL injections
app.use(helmet()); //Security Headers
app.use(xss()); //XSS Protection

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000, // No of Requests
});

app.use(limiter); //Rate Limiting
app.use(hpp()); //HTTP Parameter Pollution (HPP)

app.use("/api", router);

const DB_URL = process.env.DB_CONNECT;

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT=${PORT}`, new Date());
    });
  } catch (e) {
    console.log('Start App Error', e);
  }
};

startApp();
