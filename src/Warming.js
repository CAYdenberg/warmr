import React from 'react'

import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis'

import {
  lastValue,
  integrateData,
  integrateLinear,
} from './helpers'

const COLOR = '#003f5c'

const Warming = props => {
  const cumulativeTotals = props.data.map(series =>
    integrateData(series.years1965to2017)
  )
  const cumulativeGrandTotals = cumulativeTotals[0].map((_, i) => {
    return cumulativeTotals.reduce((total, series) =>
      series[i] + total
    , 0)
  })

  const projectedData = props.data.map((series, i) =>
    integrateLinear(
      {x: 2017, y: lastValue(series.years1965to2017)},
      {x: 2045, y: props.projectedValues[i]}
    )
  )
  const cumulativeProjectedTotals = projectedData[0].map((_, i) => {
    return projectedData.reduce((total, series) =>
      series[i].y + total
    , 0)
  })

  return (
    <XYPlot
      width={600}
      height={600}
      xDomain={[1965, 2050]}
    >

      <XAxis
        tickValues={[1965, 1985, 2005, 2025, 2045]}
        tickFormat={x => x}
        position="middle"
      />

      <YAxis
        position="middle"
        width={50}
        tickFormat={x => x / 1000}
      />

      <LineSeries
        data={cumulativeGrandTotals.map((cumulativeGrandTotal, i) =>
          ({x: i + 1965, y: cumulativeGrandTotal})
        )}
        className="line-series"
        stroke={COLOR}
      />

      <LineSeries
        data={cumulativeProjectedTotals.map((cumulativeProjectedTotal, i) =>
          ({x: i + 2017, y: cumulativeProjectedTotal + lastValue(cumulativeGrandTotals)})
        )}
        stroke={COLOR}
        className="line-series"
        strokeStyle="dashed"
      />

    </XYPlot>
  )
}

export default Warming
