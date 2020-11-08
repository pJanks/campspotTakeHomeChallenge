const assert = require('chai').assert;

const evaluateAvailability = (campsiteBookingData) => {
  const availableCampsites = []
  const unavailableCampsites = []
  const result = []

  // get all unavailable dates
  campsiteBookingData.forEach(possibleBooking => {
    if (possibleBooking.userStartDate - possibleBooking.reservationEndDate >= 172800000 && possibleBooking.userStartDate - possibleBooking.reservationEndDate <= 259200000 && !unavailableCampsites.includes(possibleBooking.campsiteId)) {
      unavailableCampsites.push(possibleBooking.campsiteId)
    } else if (possibleBooking.reservationStartDate - possibleBooking.userEndDate >= 86400000 && possibleBooking.reservationStartDate - possibleBooking.userEndDate <= 259200000 && !unavailableCampsites.includes(possibleBooking.campsiteId)) {
      unavailableCampsites.push(possibleBooking.campsiteId)
    }
  })

  // get all available dates
  campsiteBookingData.forEach(possibleBooking => {
    if (!availableCampsites.includes(possibleBooking.campsiteId) && !unavailableCampsites.includes(possibleBooking.campsiteId)) {
      availableCampsites.push(possibleBooking.campsiteId)
    }
  })

  // get result
  campsiteBookingData.forEach(booking => {
    booking.campsites.forEach(campsite => {
      if (!unavailableCampsites.includes(campsite.id) && !availableCampsites.includes(campsite.id)) {
        availableCampsites.push(campsite.id)
      }
      if (availableCampsites.includes(campsite.id) && !result.includes(campsite.name)) {
        result.push(campsite.name)
      }
    })
  })

  return result;
}

const formatDates = (reservationData) => {
  const userStartDate = new Date(reservationData.search.startDate + "T00:00:00");
  const userEndDate = new Date(reservationData.search.endDate + "T00:00:00");
  const reservationDates = reservationData.reservations.map(reservation => {
    const reservationStartDate = new Date(reservation.startDate)
    const reservationEndDate = new Date(reservation.endDate)
    const campsiteId = reservation.campsiteId
    return {
      userStartDate,
      userEndDate,
      reservationStartDate,
      reservationEndDate,
      campsiteId,
      campsites: reservationData.campsites
    }
  })
  return reservationDates
}

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
    const expectedFormattedInformation = formatDates(reservationData)
    assert.isArray(expectedFormattedInformation)
    assert.equal(expectedFormattedInformation.length, 8)
  })
});

describe('evaluateAvailability', () => {
  it ('only return the names of the campsites that don\'t create a one day gap', () => {
    const expectedFormattedInformation = formatDates(reservationData)
    const expectedAvailableDates = evaluateAvailability(expectedFormattedInformation)
    assert.isArray(expectedAvailableDates)
    assert.deepEqual(expectedAvailableDates, ["Comfy Cabin", "Rickety Cabin", "Cabin in the Woods"])
  })
});