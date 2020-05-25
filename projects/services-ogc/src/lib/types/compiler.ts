import { compile, compileFromFile } from 'json-schema-to-typescript';
import * as path from 'path';
import * as fs from 'fs';


const baseDir = __dirname;
const jsonschemaPath = path.join(baseDir, 'jsonschemas');
const interfacePath = path.join(baseDir, 'interfaces');


fs.readdir(jsonschemaPath, (err, files) => {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
        process.exit();
    }

    files.forEach((fileName: string) => {
        const fullPath = path.join(jsonschemaPath, fileName);
        const targetFilename = path.join(interfacePath, fileName) + '.d.ts';
        compileFromFile(fullPath)
            .then(ts => fs.writeFileSync(targetFilename, ts));
    });
});
