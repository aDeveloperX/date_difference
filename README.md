Please Notice:
    The checkResults function uses a "weird" way to check if the actual result is the same as the expected result is because the expected result is calculated
base on millisecond which means it can be inaccurate. So if you want to check the accurate result, please check on "https://www.timeanddate.com/date/durationresult.html"
    Some functions might be hard to read because I want to use more advanced approachs to demostrate my skills better, normally my code is very human-readable :)
    
  
How to run:
   1. Navigate into the project folder
   2. Run "node solution.js"

How to add test cases: 
   1. Simply edit tests.txt file and follow the given format 
   2. Make sure the "start" date is prior to "end" date
   3. One line one case (do not use more than one line to write one test case)
   4. The attribute "outOfRange" is optional but it should be set to "true" whenever the start date or end date is out of the given range which is 1900-2010
   Test Data Format" {"start": "DD MM YYYY", "end": "DD MM YYYY", "outOfRange": "true", "description": "Something"}
