"use strict";
var formidable = require('formidable');
var functions = require('./trial_vkyc.js');
var trial = require('./connect/src/trial.js');
const submitInfo = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.write('File uploaded');
        aadhar_card_photo = files.aadhar.filepath;
        pan_card_photo = files.pan.filepath;
        filepath_array = [aadhar_card_photo, pan_card_photo];
        functions.addFile(filepath_array).then(x => {
            console.log(x);
            trial.submitt(x);
        });
        res.end();
    });
};
//module.exports = { submitInfo };
//# sourceMappingURL=controller.js.map