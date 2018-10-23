import React from 'react'

import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis'

import {
  lastValue,
  integrateData,
  integrateLinear,
  sumSeries
} from './helpers'

const COLOR = '#003f5c'

const Warming = props => {
  const cumulativeTotals = props.data.map(series =>
    integrateData(series.years1965to2017)
  )
  const cumulativeWorldTotals = sumSeries(cumulativeTotals)

  const projectedData = props.data.map((series, i) =>
    integrateLinear(
      lastValue(series.years1965to2017),
      props.projectedValues[i],
      (2045 - 2018)
    )
  )
  const cumulativeProjectedTotals = sumSeries(projectedData)

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

      {/*
        2nd YAxis - conversion rate is 1.5 deg per trillion Tonnes C
        which equals 0.4 deg per trillion Tonnes CO2. The 1000 mark on the primary
        axis is 1 trillion tonnes C02.
      */}

      <LineSeries
        data={cumulativeWorldTotals.map((value, i) =>
          ({x: i + 1965, y: value})
        )}
        className="line-series"
        stroke={COLOR}
      />

      <LineSeries
        data={cumulativeProjectedTotals.map((value, i) =>
          ({x: i + 2018, y: value + lastValue(cumulativeWorldTotals)})
        )}
        stroke={COLOR}
        className="line-series"
        strokeStyle="dashed"
      />

    </XYPlot>
  )
}

export default Warming
