# Campspot Take Home Challenge

## Introduction:
This is a small scale app that can avoid creating one-day gaps in reservations of campsites based on a user's requested dates and current reservations, both provided in a `.json` file uploaded to the app.

## Description:
I approached the problem by creating `Date` objects from the provided search and reservation dates, which came in as strings in the format YYYY/MM/DD originally. I was then able to take those values and compare the search dates with reservation start and end dates to determine if it would create a one-day gap. If the correct conditions were met the name of that particular campsite was pushed into a `result` array and displayed on the DOM. One thing that had to be considered specifically was if a campsite had no reservations, and logic had to be written for that condition as well to mark that campsite as available. Another thing that had to be thought out carefully is that the 3rd and the 4th days of a month are not necessarily a one-day gap, as I had originally assumed, so that was something that had to be taken into consideration and refactored.

## Testing
I utilized Mocha and Chai for testing. My test were geared towards making sure that the expected data was being returned after receiving the provided sample input.

## How to run the application locally with NPM:
1. Clone down this repo to your local machine.
2. Change into the directory and run `npm install` in your terminal.
3. Run `open index.html` in your terminal.
4. Click on the "Choose File" button in your browser and select the `test-case.json` file to evaluate available campsites for the sample requested dates.
5. Enter `npm test main-test.js` in your terminal to run the tests.
