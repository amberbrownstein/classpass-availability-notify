import { writeFileSync }  from 'fs';
import updateFileData from "./updateFileData.js";
import checkSchedule from "./checkSchedule.js";
import SE from "./sendEmail.cjs";
import updateOpenClasses from "databaseFunctions.js";


async function testCheckSchedule(startDate, daysInFuture, venues) {
    const openClasses = await checkSchedule(startDate, daysInFuture, venues);
    console.log('\ntestCheckSchedule complete. Open Classes:')
    openClasses.forEach((openClass) => console.log(`\n${JSON.stringify(openClass)}`));
    return openClasses;
}

async function testEmail(newClasses, fileName) {
    const emailResult = await SE.sendEmail(newClasses, fileName);
    console.log(`\ntestEmail complete. Result:\n${emailResult}`);
    return emailResult;
}

async function endToEndTest(startDate, daysInFuture, venues, fileName) {
    const newClasses = await testCheckSchedule(startDate, daysInFuture, venues)
        .then((openClasses) => testUpdateFileData(openClasses, fileName))
        .catch((err) => console.log(err));

    if (newClasses.length > 0)
        return await testEmail(fileName, newClasses);
}

const resetFile = (fileName) => writeFileSync(fileName, '');

await endToEndTest(new Date(), 7, [188559, 41738], 'currentAvailability.json');
resetFile('currentAvailability.json');