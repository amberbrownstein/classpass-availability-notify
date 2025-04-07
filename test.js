import { writeFileSync }  from 'fs';
import updateFileData from "./updateFileData.js";
import checkSchedule from "./checkSchedule.js";
import triggerEmail from "./triggerEmail.js";

async function testCheckSchedule(startDate, daysInFuture, venues) {
    const openClasses = await checkSchedule(startDate, daysInFuture, venues);
    console.log('\ntestCheckSchedule complete. Open Classes:')
    openClasses.forEach((openClass) => console.log(`\n${JSON.stringify(openClass)}`));
    return openClasses;
}
function testUpdateFileData(openClasses, fileName) {
    const newClasses = updateFileData(fileName, openClasses);
    console.log('\ntestUpdateFileData complete. New Classes:')
    newClasses.forEach((newClass) => console.log(`\n${JSON.stringify(newClass)}`));
    return newClasses;
}
async function testEmail(newClasses, fileName) {
    const emailResult = await triggerEmail(newClasses, fileName);
    console.log(`\ntestEmail complete. Result:\n${emailResult}`);
    return emailSent;
}

async function endToEndTest(startDate, daysInFuture, venues, fileName) {
    const newClasses = await testCheckSchedule(startDate, daysInFuture, venues)
        .then((openClasses) => testUpdateFileData(openClasses, fileName))
        .catch((err) => console.log(err));

    if (newClasses.length > 0)
        return await testEmail(fileName, newClasses);
}

const resetFile = (fileName) => writeFileSync(fileName, '');

await endToEndTest(new Date(), 1, [188559, 41738], 'currentAvailability.json');
resetFile('currentAvailability.json');