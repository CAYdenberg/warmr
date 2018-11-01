import React from 'react'

import XYPlot from 'react-vis/dist/plot/xy-plot'
import XAxis from 'react-vis/dist/plot/axis/x-axis'
import YAxis from 'react-vis/dist/plot/axis/y-axis'
import LineSeries from 'react-vis/dist/plot/series/line-series'
import VerticalRectSeries from 'react-vis/dist/plot/series/vertical-rect-series'
import GradientDefs from 'react-vis/dist/plot/gradient-defs'

import {
  lastValue,
  integrateData,
  integrateLinear,
  sumSeries
} from './helpers'
import {SERIES_COLORS, AXIS_STYLE} from './constants'

const Warming = props => {
  const cumulativeTotals = props.data.map(series =>
    integrateData(series.years1965to2017)
  )
  const cumulativeWorldTotals = sumSeries(cumulativeTotals)

  const projectedData = props.data.map((series, i) =>
    integrateLinear(
      lastValue(series.years1965to2017),
      props.slopes[i],
      (2100 - 2017)
    )
  )
  const cumulativeProjectedTotals = sumSeries(projectedData)

  return (
    <XYPlot
      width={800}
      height={600}
      xDomain={[1965, 2100]}
      margin={{left: 50, right: 50}}
    >
      <GradientDefs>
        <linearGradient id="warming-range" x0="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="red" stopOpacity={0} />
          <stop offset="50%" stopColor="red" stopOpacity={0.5} />
          <stop offset="100%" stopColor="red" stopOpacity={0} />
        </linearGradient>
      </GradientDefs>

      <XAxis
        tickValues={[1965, 1985, 2005, 2025, 2045, 2065, 2085]}
        tickFormat={x => x}
        title="Year"
        style={AXIS_STYLE}
        position="middle"
      />

      <YAxis
        title="Cumulative Emissions (billion tonnes CO&#8322;)"
        tickFormat={x => x / 1000}
        style={AXIS_STYLE}
      />

      <YAxis
        position="start"
        title="Total warming (&deg;C)"
        orientation="right"
        left={750}
        width={50}
        tickFormat={x => x / (2.5 * 10e5)}
        style={AXIS_STYLE}
      />

      <LineSeries
        data={cumulativeWorldTotals.map((value, i) =>
          ({x: i + 1965, y: value})
        )}
        className="line-series"
        stroke={SERIES_COLORS[0]}
      />

      <LineSeries
        data={cumulativeProjectedTotals.map((value, i) =>
          ({x: i + 2018, y: value + lastValue(cumulativeWorldTotals)})
        )}
        stroke={SERIES_COLORS[0]}
        className="line-series"
        strokeStyle="dashed"
      />

      <VerticalRectSeries
        data={cumulativeProjectedTotals.map((value, i) => {
          const base = value + lastValue(cumulativeWorldTotals)
          return {x: i + 2019, x0: i + 2018, y: base * 1.5, y0: base * 0.5}
        })}
        fill="url(#warming-range)"
        className="line-series"
        stroke="none"
        cluster="a"
      />

    </XYPlot>
  )
}

export default Warming
