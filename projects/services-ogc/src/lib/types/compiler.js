"use strict";
exports.__esModule = true;
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var path = require("path");
var fs = require("fs");
var baseDir = __dirname;
var jsonschemaPath = path.join(baseDir, 'jsonschemas');
var interfacePath = path.join(baseDir, 'interfaces');
fs.readdir(jsonschemaPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
        process.exit();
    }
    files.forEach(function (fileName) {
        var fullPath = path.join(jsonschemaPath, fileName);
        var targetFilename = path.join(interfacePath, fileName) + '.d.ts';
        json_schema_to_typescript_1.compileFromFile(fullPath)
            .then(function (ts) { return fs.writeFileSync(targetFilename, ts); });
    });
});
