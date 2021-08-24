import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; //to use env variables
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import multer from 'multer';

import router from './router.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(mongoSanitize()); //  Prevent NoSQL injections
app.use(helmet()); //Security Headers
app.use(xss()); //XSS Protection

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1000, // No of Requests
});

app.use(limiter); //Rate Limiting
app.use(hpp()); //HTTP Parameter Pollution (HPP)

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(
    multer({
        storage: storageConfig
    }).single('filedata')
);

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT=${PORT}`, new Date());
});
