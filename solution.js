// Description:
// Create an application that can read in pairs of dates in the following
// format -
//     DD MM YYYY, DD MM YYYY
// Validate the input data, and compute the difference between the two dates
// in days.
// Output of the application should be of the form -
//     DD MM YYYY, DD MM YYYY, difference
// Where the first date is the earliest, the second date is the latest and the difference is the number of days.
// Input can be from a file, or from standard input, as the developer chooses.
// Provide test data to exercise the application.
// Constraints:
// The application may not make use of the platform / SDK libraries for date manipulation
// (for example Date, Calendar classes).
// The application can limit calculation on an input range of dates from 1900 to 2010
// Deliverables:
// The source files, the test data and any test code.

const fs = require("fs");

/**
 * construct a json object like {day:?, month:?, year:?}
 * @param {Array<string>} keys - keys used to generate the object
 * @param {string} dateStr - the given string in the format of DD MM YYYY
 * @returns {object} - a constructed object like {day:?, month:?, year:?}
 */
const constructObj = (keys, dateStr) => {
  return keys.reduce(
    (o, key, i) => ({ ...o, [key]: parseInt(dateStr.split(" ")[i]) }),
    {}
  );
};

/**
 * Calculate the total days of the given year or month by parameter
 * @param {number} year - The year that is going to be used for calculation.
 * @param {number | boolean} month - The month that is going to be used for calculation.
 * @returns {number} - Total days
 */
const getTotalDays = (year, month = false) => {
  // Check if the given year is leap year or not
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  // Array that contains days of each month
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return month
    ? daysInMonth[month - 1]
    : daysInMonth.reduce((a, b) => a + b, 0);
};

/**
 * Check if the year is in the range of 1900-2010 as required by the specification
 * @param {number} year - The year to be checked
 * @returns {boolean} - Return if the year is in range or not
 */
const isYearInRange = (year) => {
  return year <= 2010 && year >= 1900;
};

/**
 * Get the remaning days of the year
 * @param {object} dateObj - in format of {day:?, month:?, year:?}
 * @returns {number} - the total remaining days of year based on the given dateObj
 */
const getRemainingDays = (dateObj) => {
  const { day, month, year } = dateObj;
  let passedDays = 0;
  for (let i = 1; i < month; i++) {
    passedDays += getTotalDays(year, i);
  }
  return getTotalDays(year) - (passedDays + day);
};

/**
 * Get the passed days of the year
 * @param {object} dateObj - in format of {day:?, month:?, year:?}
 * @returns - the total passed days of year based on the given dateObj
 */
const getPassedDays = (dateObj) => {
  const { year } = dateObj;
  return getTotalDays(year) - getRemainingDays(dateObj);
};

/**
 * Get the days between the two given date strings
 * @param {string} firstStr - The first given string in format of DD MM YYYY
 * @param {string} secondStr - The second given string in format of DD MM YYYY
 * @returns The total days between the two given dates
 */
const solution = (firstStr, secondStr) => {
  // Keys used to construct the objects
  const keys = ["day", "month", "year"];
  // Construct the two strings to objects
  const [date_first, date_second] = [firstStr, secondStr].map((date) =>
    constructObj(keys, date)
  );
  // Check if the given dates are in range, if not, return error message
  if (!isYearInRange(date_first.year) || !isYearInRange(date_second.year)) {
    return "Year should be in range of 1900 - 2010";
  }

  // Counter used for calculation
  let totalDaysBetweenYears = 0;

  // If the year number of the start year is the same as the second one
  if (date_first.year === date_second.year) {
    return getPassedDays(date_second) - getPassedDays(date_first);
  }
  // If the years are not the same
  for (let i = date_first.year; i < date_second.year - 1; i++) {
    totalDaysBetweenYears += getTotalDays(i);
  }

  return (
    getRemainingDays(date_first) +
    totalDaysBetweenYears +
    getPassedDays(date_second)
  );
};
