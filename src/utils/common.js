import axios from 'axios';
export const currencyFormat = (num=0) => {
  if (num !== undefined && num !== null && num !== '') {
    if(typeof num === 'string') {
      if(parseInt(num)){
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

export const percentRounded = ( val = 0, percent = 100, decimals = 2) => {
  var result = val * percent / 100
  return result.toFixed(decimals)
}

export const calculateDailyServiceTotals = (dailyData, peakRange, lowPrice = 50, highPrice = 75) => {
  let lowHours = 0, highHours = 0
  const peakInit = peakRange.peakInit || 13;
  const peakEnd = peakRange.peakEnd || 20;
  dailyData.forEach(dayConfig => {
    const { startHour, endHour } = dayConfig
    for(let i = startHour; i< endHour ; i++ ){
        if( i < peakInit || i >= peakEnd ){
          lowHours++
        } else {
          highHours++
        }
    }
  });
  const minTotal = lowHours * (lowPrice * 60 / 5), maxTotal = highHours * (highPrice * 60 / 5)
  const totalHours = lowHours + highHours;
  const total = maxTotal + minTotal
  return { total, minTotal, maxTotal, totalHours, lowHours, highHours }
}

export const parsePeakHourRange = range => {
  if(!!range && range.length > 0){
    return {
      peakInit : parseInt(range.substr(0,2)),
      peakEnd : parseInt(range.substr(6,2))
    }
  }
  return {
    peakInit : null,
    peakEnd : null
  }
}
export const parseDayToDDMMYYYY = ( day ) => {
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
          variables[constant.tag] = { description: constant.description, value: parseFloat( constant.constant )}
        });
        response.data.labels.forEach(label => {
          variables[label.tag] = { description: label.description, value: label.text }
        })
        callback(variables)
      }
    })
}