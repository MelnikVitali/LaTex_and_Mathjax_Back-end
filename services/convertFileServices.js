import child_process from 'child_process';

class ConvertFileServices {
    constructor() {
    }

    convertFile(file) {

        return new Promise((resolve, reject) =>{
            const spawn = child_process.spawn(
                'latexmlc',
                [`./uploads/${file.originalname}`, '--dest=./uploads/output.html'],
                {shell: true}
            );

            spawn.on('error', err => {
                console.log('File parse error', err);
                reject(err);
            });

            spawn.on('close', code => {
                console.log(`child process exited with code ${code}`);
                if(code === 0 ){
                    resolve();
                }else {
                    reject(`child process exited with code ${code}`);
                }
            });
        });
    }
}

export default new ConvertFileServices();
