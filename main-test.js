const assert = require('chai').assert
const app = require('./main')

const reservationData = {
  "search": {
    "startDate": "2018-06-04",
    "endDate": "2018-06-06"
  },
  "campsites": [
    {
      "id": 1,
      "name": "Cozy Cabin"
    },
    {
      "id": 2,
      "name": "Comfy Cabin"
    },
    {
      "id": 3,
      "name": "Rustic Cabin"
    },
    {
      "id": 4,
      "name": "Rickety Cabin"
    },
    {
      "id": 5,
      "name": "Cabin in the Woods"
    }
  ],
  "reservations": [
    {"campsiteId": 1, "startDate": "2018-06-01", "endDate": "2018-06-03"},
    {"campsiteId": 1, "startDate": "2018-06-08", "endDate": "2018-06-10"},
    {"campsiteId": 2, "startDate": "2018-06-01", "endDate": "2018-06-01"},
    {"campsiteId": 2, "startDate": "2018-06-02", "endDate": "2018-06-03"},
    {"campsiteId": 2, "startDate": "2018-06-07", "endDate": "2018-06-09"},
    {"campsiteId": 3, "startDate": "2018-06-01", "endDate": "2018-06-02"},
    {"campsiteId": 3, "startDate": "2018-06-08", "endDate": "2018-06-09"},
    {"campsiteId": 4, "startDate": "2018-06-07", "endDate": "2018-06-10"}
  ]
}

describe('formatDates', () => {
  it ('should return an array of objects with all necessary info and dates formatted correctly', () => {
    const expectedFormattedInformation = app.formatDates(reservationData)
    assert.isArray(expectedFormattedInformation)
    assert.equal(expectedFormattedInformation.length, 8)
  })
});

describe('evaluateAvailability', () => {
  it ('only return the names of the campsites that don\'t create a one day gap', () => {
    const expectedFormattedInformation = app.formatDates(reservationData)
    const expectedAvailableDates = app.evaluateAvailability(expectedFormattedInformation)
    assert.isArray(expectedAvailableDates)
    assert.deepEqual(expectedAvailableDates, ["Comfy Cabin", "Rickety Cabin", "Cabin in the Woods"])
  })
});