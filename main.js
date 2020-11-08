if (typeof window !== "undefined") {
  window.addEventListener("load", () => {

    const availableCampsiteSection = document.querySelector('.campsites-section')
    const reservationFileInput = document.querySelector(".reservation-data");
   
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

      return result
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

    const updateDom = (availableSites) => {
      availableSites.forEach(site => {
        availableCampsiteSection.insertAdjacentHTML("afterbegin", `<li>${site}</li>`)
      })
    }
    
    if (reservationFileInput) {
      reservationFileInput.addEventListener("change", () => {
        if (reservationFileInput.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            const result = JSON.parse(reader.result);
            const reservationData = formatDates(result);
            const availableSites = evaluateAvailability(reservationData)
            updateDom(availableSites)
          });
          reader.readAsText(reservationFileInput.files[0]);
        }
      });
    }
  });
}