const fs = require('fs');
let CS = require("./checkSchedule.js");

let getNewData = (func, ...params) => func(...params);

function updateFileData(fileName, newData) {
    let fileContents = fs.readFileSync(fileName);
    let oldData = fileContents.length > 0 ? new Map(Object.entries(JSON.parse(fileContents))) : new Map();
    let newClasses = [];
    let newDataToWrite = {};

    newData.forEach((value, key) => {
        newDataToWrite[key] = value;

        if (!oldData.has(key)) {
            newClasses.push(value);
        }
    })

    fs.writeFileSync(fileName, JSON.stringify(newDataToWrite));

    //if (newClasses.length > 0)
        //triggerEmail(fileName, newClasses.join(`\n`));
}

function triggerEmail(fileName) {
    return null;
}

module.exports = { updateFileData, getNewData };