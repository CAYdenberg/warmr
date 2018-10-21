import React from 'react'

import {XYPlot, XAxis, YAxis, LineSeries, Voronoi} from 'react-vis'

import {
  lastValue,
} from './helpers'

const COLORS = [
  '#003f5c',
  '#374c80',
  '#7a5195',
  '#bc5090',
  '#ef5675',
  '#ff764a',
  '#ffa600'
]

class Emissions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedSeries: 0,
      isDragging: false
    }

    this.setSelected = this._setSelected.bind(this)
  }

  _setSelected(point) {
    const i = this.props.projectedValues.findIndex(value => value === point.y)
    this.setState({
      selectedSeries: i
    })
  }

  render() {
    const {state, props} = this

    return (
      <XYPlot
        width={600}
        height={600}
        xDomain={[1965, 2050]}
        yDomain={[0, 24000]}
        className="emissions-chart--regional"
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

        {props.data.map((series, i) =>
          <LineSeries
            data={series.years1965to2017.map((datapoint, i) =>
              ({x: i + 1965, y: datapoint})
            )}
            className="line-series"
            stroke={COLORS[i]}
            strokeWidth={state.selectedSeries === i ? 4 : 2}
            key={series.name}
          />
        )}

        {props.projectedValues.map((value, i) => {
          const last = lastValue(props.data[i].years1965to2017)
          return (
            <LineSeries
              data={[ {x: 2017, y: last}, {x: 2045, y: value} ]}
              stroke={COLORS[i]}
              strokeStyle="dashed"
              strokeWidth={state.selectedSeries === i ? 4 : 2}
              key={props.data[i].name}
            />
          )
        })}

        <Voronoi
          nodes={props.projectedValues.map(value => ({x: 2045, y: value}))}
          onHover={this.setSelected}
        />

      </XYPlot>
    )
  }
}

export default Emissions
