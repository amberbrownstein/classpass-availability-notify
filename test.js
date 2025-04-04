let S = require("./scheduler.js");
let CS = require("./checkSchedule.js");
async function test() {
    const ret = await CS.checkSchedule(new Date(), 7, [188559, 41738]);
    //ret.forEach((ret) => console.log(`\nReturned: ${JSON.stringify(ret)}`));
    return ret;
}
async function testFileStuff() {
    const newData = await CS.checkSchedule(new Date(), 7, [188559, 41738]);
    const sendEmail = S.updateFileData('currentAvailability.json', newData);
    //console.log(sendEmail);
}

testFileStuff();
//test();