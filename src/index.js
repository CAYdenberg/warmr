import React from 'react'
import ReactDOM from 'react-dom'
import './App.scss'

import {regions} from './api'
import {XYPlot, XAxis, YAxis, LineSeries, Highlight} from 'react-vis'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loadState: 0,
      data: null,
      selectedSeries: null
    }
  }

  componentDidMount() {
    this.setState({
      loadState: 1
    })

    regions().then(res => {
      this.setState({
        loadState: 2,
        data: res
      })
    })
  }

  render() {
    if (!this.state.data) return null

    return (
      <XYPlot
        width={600}
        height={600}
        yDomain={[0, 6800]}
        className="emissions-chart--regional"
      >

        <XAxis
          tickValues={[1965, 1985, 2005, 2025, 2045]}
          tickFormat={x => x}
          position="middle"
        />

        <YAxis
          position="middle"
          width="50"
        />

        <LineSeries
          data={this.state.data[0].years1965to2017.map((datapoint, i) =>
            ({x: i + 1965, y: datapoint})
          )}
          className="line-series"
        />

        <LineSeries
          data={[{x: 2005, y: 6800}, {x: 2045, y: 4800}]}
          className="trend-line"
          stroke="black"
          strokeStyle="dashed"
        />

      </XYPlot>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-entry')
)
