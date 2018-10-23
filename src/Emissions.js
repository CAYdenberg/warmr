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
      xPos: null,
      yPos: null,
    }

    this.setSelected = this._setSelected.bind(this)
    this.handleMouseDown = this._handleMouseDown.bind(this)
    this.handleMouseUp = this._handleMouseUp.bind(this)
    this.handleDrag = this._handleDrag.bind(this)
  }

  _setSelected(point) {
    if (this.state.yPos) return
    const i = this.props.projectedValues.findIndex(value => value === point.y)
    this.setState({
      selectedSeries: i
    })
  }

  _handleMouseDown(e) {
    this.setState({
      xPos: e.nativeEvent.clientX,
      yPos: e.nativeEvent.clientY,
    })
  }

  _handleMouseUp() {
    this.setState({
      isDragging: false,
      xPos: null,
      yPos: null,
    })
  }

  _handleDrag(e) {
    if (!this.state.yPos) return
    const {clientX, clientY} = e.nativeEvent
    this.props.onSeriesDrag(
      this.state.selectedSeries,
      clientX - this.state.xPos,
      this.state.yPos - clientY
    )
    this.setState({
      xPos: clientX,
      yPos: clientY
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
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleDrag}
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
