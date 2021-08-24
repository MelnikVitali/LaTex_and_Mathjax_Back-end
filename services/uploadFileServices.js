import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

class UploadFileServices {
    constructor() {
    }

    saveFile(file) {
        return new Promise((resolve, reject) => {
            console.log(file.originalname);

            fs.writeFile(__dirname + 'upload', file.originalname, (writeFileError) => {

                console.log('Successfully wrote payload to file for conversion.');

                resolve(file);

                if (writeFileError) {
                    console.error(writeFileError);

                    reject(writeFileError);
                }
            })
        })
    }
}

export default new UploadFileServices();
