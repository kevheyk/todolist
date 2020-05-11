// Module.exports is a Object.
// Add functions as the properties of the Object

// Syntax 1
// module.exports.getDate = getDate;
// module.exports.getDay = getDay;

// Syntax 2
// module.exports = {
//   getDate : getDate,
//   getDay : getDay
// }

// Syntax 3 - anonymous function
module.exports.getDate = function() {
  // Return the Date of system date.
  const day = new Date().toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",

  });

  return day;
}

// Syntax 4 - Shorthand 
exports.getDay = function () {
  // return the weekDay of  system date
  const day = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  return day;
}



