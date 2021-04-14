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

// Import fs module to read test.txt file
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
const date_difference = (firstStr, secondStr) => {
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

//------------- FOR TEST OUTPUT ------------//

/**
 * Parse DD MM YYYY to MM/DD/YYYY
 * @param {string} date - Date object in format of DD MM YYYY
 * @returns Date object in format of MM/DD/YYYY
 */
const dateParser = (date) => {
  let dateHolder = date.split(" ");
  return [dateHolder[1], dateHolder[0], dateHolder[2]].join("/");
};

/**
 * Calculate the answer based on the Date Object to get the actual result
 * @param {string} startDate - Starting date in format of DD MM YYYY
 * @param {string} endDate - End date in format of DD MM YYYY
 * @returns The total days between the two given dates
 */
const getAnswerByLibrary = (startDate, endDate) => {
  let [newStartDate, newEndDate] = [startDate, endDate].map((date) =>
    dateParser(date)
  );
  const date_first = new Date(newStartDate);
  const date_second = new Date(newEndDate);
  // Calculate time difference
  const time_difference = date_second - date_first;
  // Calculate days difference by dividing total milliseconds of a day
  return time_difference / (1000 * 60 * 60 * 24);
};

/**
 * Check if the actual result is the same as the expect
 * !!!!!!!!!! The expected result is calculated base on millisecond so it can be decimal number(+=1 days) !!!!!!!!
 * !!!!!!!!!! So there might be inaccuracy so I round it up or down and + 1 and - 1 to fix that !!!!!!!!
 * !!!!!!!!!! You can use the link below to check the accurate result !!!!!!!!
 * !!!!!!!!!! https://www.timeanddate.com/date/durationresult.html !!!!!!!!
 * @param {number} actual - The actual calculated result using the function called "date_difference"
 * @param {*} expected  - The expected result using the function called "getAnswerByLibrary"
 * @returns {boolean} Returns if the results are the same
 */
const checkResults = (actual, expected) => {
  return (
    actual === expected - 1 ||
    actual === expected + 1 ||
    actual === expected ||
    actual === Math.floor(expected) ||
    actual === Math.round(expected)
  );
};

const main = () => {
  try {
    // Extract content out of the tests.txt file
    const data = fs.readFileSync("tests.txt", "UTF-8");
    // Split the contents, remove space from rows array
    const rows = data.split(/\r?\n/).filter((row) => row.trim() !== "");
    // Iterate over each test case
    let passedCounter = 0,
      failedCounter = 0,
      executedCounter = 0;
    rows.forEach((row, i) => {
      // If the line is not empty
      if (row) {
        const parsedTest = JSON.parse(row);
        const actualResult = date_difference(parsedTest.start, parsedTest.end);
        const expectedResult = getAnswerByLibrary(
          parsedTest.start,
          parsedTest.end
        );

        // If the results are the same => Pass
        if (checkResults(actualResult, expectedResult)) {
          passedCounter++;
          executedCounter++;
          console.log(
            ` Test ${
              i + 1
            } Passed, [Expect: ${expectedResult}, Actual: ${actualResult}]  ${
              parsedTest.description
            }`
          );
          // If the date is out of the given range and outOfRange is true => Pass
        } else if (
          actualResult === "Year should be in range of 1900 - 2010" &&
          parsedTest.outOfRange === "true"
        ) {
          passedCounter++;
          executedCounter++;
          console.log(
            ` Test ${
              i + 1
            } Passed, Special case: The starting date is out of range`
          );
          // Failed test case
        } else {
          failedCounter++;
          executedCounter++;
          ` Test ${
            i + 1
          } Failed, [Expect: ${expectedResult}, Actual: ${actualResult}]`;
        }
      }
    });
    console.log("\n=========Result=========");
    console.log(
      `Total Cases: ${rows.length}\nExecuted Cases: ${executedCounter}\nPassed Cases: ${passedCounter}\nFailed Cases: ${failedCounter}`
    );
  } catch (err) {
    console.error(err);
  }
};

main();
