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

export const calculateDailyServiceTotals = (dailyData) => {
  const price = {
    valueA: 50,
    valueB: 75
  }
  let lowHours = 0, highHours = 0
  dailyData.forEach(dayConfig => {
    const { startHour, endHour } = dayConfig
    for(let i = startHour; i< endHour ; i++ ){
        if( i <13 || i >= 20 ){
          lowHours++
        } else {
          highHours++
        }
    }
  });
  const minTotal = lowHours * price.valueA, maxTotal = highHours * price.valueB
  const totalHours = lowHours + highHours;
  const total = maxTotal + minTotal
  return { total, minTotal, maxTotal, totalHours, lowHours, highHours }
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