import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

class SendHtmlServices {
    constructor() {
    }

    sendHtml(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/uploads/output.html', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const html = data.toString();

                    const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                    const array_matches = pattern.exec(html);

                    const footerPattern = /<footer[^>]*>((.|[\n\r])*)<\/footer>/im;

                    const result = array_matches[1].replace(footerPattern, '');

                    resolve(result);
                }
            });
        })
    }
}

export default new SendHtmlServices();
