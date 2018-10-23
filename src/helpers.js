
export const lastValue = series => {
  return series[series.length - 1]
}

export const isLastValue = (haystack, needle) => {
  return lastValue(haystack) === needle
}

export const fillInLinear = (startPoint, endPoint, spacing = 1) => {
  const slope = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)
  let acc = [startPoint]
  while (lastValue(acc).x < endPoint.x) {
    acc = acc.concat({
      x: lastValue(acc).x + spacing,
      y: lastValue(acc).y + spacing * slope
    })
  }
  return acc
}

export const integrateData = series => {
  let sum = 0
  return series.map(value => {
    sum = sum + value
    return sum
  })
}

export const integrateLinear = (startPoint, endPoint, spread) => {
  let sum = 0
  const slope = (endPoint - startPoint) / spread
  return Array(spread + 1).fill(null).map((_, i) => {
    sum += startPoint + slope * i
    return sum
  })
}

export const sumSeries = dataFrame => {
  return dataFrame[0].map((_, i) => {
    return dataFrame.reduce((columnTotal, series) =>
      columnTotal + series[i]
    , 0)
  })
}
