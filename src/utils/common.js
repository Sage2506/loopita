import axios from 'axios';
export const currencyFormat = (num = 0) => {
  if (num !== undefined && num !== null && num !== '') {
    if (typeof num === 'string') {
      if (parseInt(num)) {
        num = parseInt(num)
      } else {
        return '$0.00'
      }
    }
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else {
    return '$0.00'
  }
}

export const percentRounded = (val = 0, percent = 100, decimals = 2) => {
  var result = val * percent / 100
  return result.toFixed(decimals)
}

export const calculateDailyServiceTotals = (dailyData, peakRange, lowPrice = 50, highPrice = 75, loopDuration = 300) => {
  let lowHours = 0, highHours = 0
  const peakInit = peakRange.peakInit || 13;
  const peakEnd = peakRange.peakEnd || 20;
  dailyData.forEach(dayConfig => {
    const { startHour, endHour } = dayConfig
    for (let i = startHour; i < endHour; i++) {
      if (i < peakInit || i >= peakEnd) {
        lowHours++
      } else {
        highHours++
      }
    }
  });
  const timesShowing = 3600 / loopDuration;
  const minTotal = lowHours * timesShowing * lowPrice, maxTotal = highHours * timesShowing * highPrice;
  const totalHours = lowHours + highHours;
  const totalSpots = totalHours * timesShowing;
  const total = maxTotal + minTotal
  return { total, minTotal, maxTotal, totalHours, lowHours, highHours, totalSpots, timesShowing }
}

export const calculateSpotServiceTotals = (spots, startHour, endHour, dayStart, dayEnd, peakRange, lowPrice = 50, highPrice = 75, loopDuration = 300) => {
  startHour = startHour ? startHour : dayStart;
  endHour = endHour ? endHour : dayEnd;
  let peakInit = peakRange.peakInit || 13;
  let peakEnd = peakRange.peakEnd || 20;
  const totalSpotsNotCalculated = spots;
  const timesShowing = 3600 / loopDuration;
  const totalHours = totalSpotsNotCalculated / timesShowing
  const hoursPerDay = endHour - startHour;
  peakInit = peakInit < startHour ? startHour : peakInit;
  peakEnd = peakEnd > endHour ? endHour : peakEnd;
  const peaksperDay = peakEnd - peakInit;
  const peakPercent = peaksperDay / hoursPerDay
  const highHours = totalHours * peakPercent
  const lowHours = totalHours * (1 - peakPercent);
  const maxTotal = totalSpotsNotCalculated * peakPercent * highPrice
  const minTotal = totalSpotsNotCalculated * (1 - peakPercent) * lowPrice;
  const total = minTotal + maxTotal;
  return { total, minTotal, maxTotal, totalHours, lowHours, highHours, totalSpotsNotCalculated, timesShowing }
}

export const parsePeakHourRange = range => {
  if (!!range && range.length > 0) {
    return {
      peakInit: parseInt(range.substr(0, 2)),
      peakEnd: parseInt(range.substr(6, 2))
    }
  }
  return {
    peakInit: null,
    peakEnd: null
  }
}
export const parseDayToDDMMYYYY = (day) => {
  let dayParsed = day.getDate();
  if (dayParsed < 10) {
    dayParsed = '0' + dayParsed
  } else {
    dayParsed = dayParsed.toString()
  }
  let monthParsed = day.getMonth();
  if (monthParsed < 10) {
    monthParsed = '0' + monthParsed
  } else {
    monthParsed = monthParsed.toString()
  }
  const year = day.getFullYear();
  return dayParsed + '-' + monthParsed + '-' + year

}

export const initVariables = (callback) => {
  axios.get('https://loopita.impactovisual.info/data.php').then(response => {
    if (!!response.data) {
      const variables = {}
      response.data.constants.forEach(constant => {
        variables[constant.tag] = { description: constant.description, value: parseFloat(constant.constant) }
      });
      response.data.labels.forEach(label => {
        variables[label.tag] = { description: label.description, value: label.text }
      })
      callback(variables)
    }
  }).catch((error) => {

    const response = {
      "constants":
        [{ "constant": "2500", "description": "Cantidad de autos en hora normal", "tag": "carsOnNormal" },
        { "constant": "3500", "description": "Cantidad de autos en hora pico", "tag": "carsOnPeak" },
        { "constant": "320", "description": "Duracion del loop publicitario( en segundos)", "tag": "loopDuration" },
        { "constant": "7", "description": "Hora a la que inicia la pantalla a operar(formato de 24)", "tag": "minInitialHour" },
        { "constant": "24", "description": "Hora a la que termina la pantalla (formato 24)", "tag": "maxEndHour" },
        { "constant": "3.5", "description": "Costo del spot en hora normal", "tag": "normalHourSpotPrice" },
        { "constant": "5", "description": "Costo del spot en hora pico", "tag": "peakHourSpotPrice" },
        { "constant": "20000", "description": "Costo del plan mensual 1", "tag": "monthlyPlanOne" },
        { "constant": "30000", "description": "Costo del plan mensual 2", "tag": "monthlyPlanTwo" },
        { "constant": "40000", "description": "Costo del plan mensual 3", "tag": "monthlyPlanThree" },
        { "constant": "1", "description": "Multiplicador del loop del mes 1", "tag": "loopMultiplierOne" },
        { "constant": "2", "description": "Multiplicador del loop del mes 2", "tag": "loopMultiplierTwo" },
        { "constant": "3", "description": "Multiplicador del loop del mes 3", "tag": "loopMultiplierThree" }],
      "labels": [
        { "text": "Solicitud enviada. Nos contactaremos contigo antes de 24 horas al telefono proporcionado. Si gustas contactarete con nosotros: (664 )331-6786", "description": "Texto para confirmacion de solicitud de compra", "tag": "confirmMessage" }, { "text": "Empresa", "description": "El texto que va sobre el cuarto input de la segunda pantalla", "tag": "homeInputFourLabel" }, { "text": "14:00-18:00", "description": "rango de horas piko (formato 00:00-24:00)", "tag": "peakHourRange" }]
    }
    const variables = {}
    response.constants.forEach(constant => {
      variables[constant.tag] = { description: constant.description, value: parseFloat(constant.constant) }
    });
    response.labels.forEach(label => {
      variables[label.tag] = { description: label.description, value: label.text }
    })
    callback(variables)
  }
  )
}