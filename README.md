Author: Yichuan Wang

Email: w369371@gmail.com

## Please Notice:

1. The checkResults function uses a "weird" way to check if the actual result is the same as the expected result is because the expected result is calculated
base on millisecond which means it can be inaccurate. So if you want to check the accurate result, please refer to https://www.timeanddate.com/date/durationresult.html
 
 
2. Some functions might be hard to read because I want to use more advanced approachs to demonstrate my skills better, normally my code is very human-readable :)
    
    
3. The program will be tested against all test cases in `tests.txt` and the output will be printed in terminal using `console.log`. This program does not require any user input. If you want to change test cases, please refer to the "How to add test cases" section below
  
## How to run:
   1. Navigate into project folder
   2. Run `node solution.js` in command line if you already have node.js installed

## How to add test cases: 
   1. Simply edit `tests.txt` file and follow the given format 
   2. Make sure the `start` date is prior to "end" date
   3. One line one case (do not use more than one line to write one test case)
   4. The attribute `outOfRange` is optional but it should be set to `true` whenever the start date or end date is out of the given 
   range which is from 1900 to 2010
   
## Test Data Format: 
   
   `{"start": "DD MM YYYY", "end": "DD MM YYYY", "outOfRange": "true", "description": "Something"}`
   
   
## Sample Output:


![Screen Shot 2021-04-15 at 00 58 10](https://user-images.githubusercontent.com/51860496/114732267-ba7e9080-9d85-11eb-991d-83b8f9afa73b.png)


