let CS = require("./checkSchedule.js");
async function test() {
    const ret = await CS.checkSchedule(new Date(), 7, [188559, 41738]);
    ret.forEach((ret) => console.log(`\nReturned: ${JSON.stringify(ret)}`));
}

test();