import fs from 'fs';
import * as child_process from 'child_process';
import path from 'path';

import UploadFileServices from '../services/uploadFileServices.js';
import ConvertFileServices from '../services/convertFileServices.js';
import SendHtmlServices from '../services/sendHtmlServices.js';

const __dirname = path.resolve();

class UploadController {

    constructor() {
    }

    async uploadFile(req, res) {
        try {
            await UploadFileServices.saveFile(req.file);

            await ConvertFileServices.convertFile(req.file);

            const result = await SendHtmlServices.sendHtml(req.file);

            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default new UploadController();
