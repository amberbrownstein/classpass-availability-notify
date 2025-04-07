import { readFileSync, writeFileSync } from 'fs';
//import checkSchedule from "./checkSchedule.js";
import triggerEmail from "./triggerEmail.js";

let getNewData = (func, ...params) => func(...params);
export default function updateFileData(fileName, newData) {
    let fileContents = readFileSync(fileName);
    let oldData = fileContents.length > 0 ? new Map(Object.entries(JSON.parse(fileContents))) : new Map();
    let newClasses = [];
    let newDataToWrite = {};

    newData.forEach((value, key) => {
        newDataToWrite[key] = value;

        if (!oldData.has(key)) {
            newClasses.push(value);
        }
    })

    writeFileSync(fileName, JSON.stringify(newDataToWrite));

    return newClasses;
}