
export const lastValue = series => {
  return series[series.length - 1]
}

export const isLastValue = (haystack, needle) => {
  return lastValue(haystack) === needle
}

export const createLinearSeries = (startPoint, slope, numDatapoints) => {
  return Array(numDatapoints + 1).fill(null).map((_, i) => {
    const value = startPoint + slope * i
    return (value > 0) ? value : 0
  })
}

export const integrateData = series => {
  let sum = 0
  return series.map(value => {
    sum = sum + value
    return sum
  })
}

export const integrateLinear = (startPoint, slope, spread) =>
  integrateData(createLinearSeries(startPoint, slope, spread))

export const sumSeries = dataFrame => {
  return dataFrame[0].map((_, i) => {
    return dataFrame.reduce((columnTotal, series) =>
      columnTotal + series[i]
    , 0)
  })
}
