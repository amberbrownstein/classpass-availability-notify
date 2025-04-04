let CA = require("./callApi.js");
async function checkSchedule(startDate, daysInFuture, venues){
  const url = "https://classpass.com/_api/v3/search/schedules";
  const method = "POST";
  var data = {
    "report_ineligible_classes": false,
    "exclude_past_booking": true,
    "venue": venues
  };

  let curDate = new Date(startDate);
  const startDayOfMonth = startDate.getDate();
  var classes = new Map();

  for (let i = 0; i < daysInFuture; i++) {
    curDate = new Date(curDate.setDate(startDayOfMonth + i));
    data.date = curDate;
    const schedules = JSON.parse(await CA.callApi(url, method, data)).schedules;

    schedules.forEach((openClass) => { 
      const classDetails = {
        "dateTime": new Date(openClass.starttime * 1000).toString(),
        "location": openClass.venue.subtitle,
        "teacher": openClass.teacher_name,
        "credits": openClass.availability.credits
      };

      classes.set(openClass.id, classDetails);
    });
  }

  return classes;
}

module.exports = {checkSchedule};
