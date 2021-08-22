import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; //to use env variables
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import multer from 'multer';
import * as child_process from 'child_process';
import * as fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

// import router from './router.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
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

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(express.static(__dirname));

app.use(multer({storage: storageConfig}).single('filedata'));

// app.use("/api", router);
app.post('/upload', (req, res) => {

    console.log(req.file);
    if (!req.file)
        res.send('Error loading file');
    else
        fs.writeFile( __dirname + 'upload', req.file.originalname, (writeFileError) => {

        console.log('Successfully wrote payload to file for conversion.')

        if (writeFileError) {
            res.status(500).send(writeFileError.message);
        } else {
            try {
                const spawn = child_process.spawn(
                    'latexmlc',
                    [`./uploads/${req.file.originalname}`, '--dest=./uploads/output.html'],
                    { shell: true }
                );

                spawn.on('error', err => {
                   console.log('File parse error', err);
                });

                spawn.on('close', code => {
                    console.log(`child process exited with code ${code}`);
                        fs.readFile(__dirname + '/uploads/output.html', (err, data) => {
                            if (err) {
                                res.status(500).send(err.message);
                            } else {
                                const html = data.toString();

                                const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                                const array_matches = pattern.exec(html);

                                const footerPattern = /<footer[^>]*>((.|[\n\r])*)<\/footer>/im;

                                const result = array_matches[1].replace(footerPattern, '');

                                res.status(200).send(result);
                            }
                        });
                });
            } catch (err) {
                console.log('An error occurred:', err);
            }

        }

    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT=${PORT}`, new Date());
});
// const DB_URL = process.env.DB_CONNECT;

// const startApp = async () => {
//   try {
//     await mongoose.connect(DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//
//     const PORT = process.env.PORT || 5000;
//
//     app.listen(PORT, () => {
//       console.log(`SERVER RUNNING ON PORT=${PORT}`, new Date());
//     });
//   } catch (e) {
//     console.log('Start App Error', e);
//   }
// };

// startApp();
