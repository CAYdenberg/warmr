import React from 'react'
import ReactDOM from 'react-dom'
import './App.scss'

import {regions} from './api'
import Emissions from './Emissions'
import Warming from './Warming'
import {
  lastValue,
} from './helpers'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      projectedValues: [],
      loadState: 0,
    }

    this.updateProjection = this._updateProjection.bind(this)
  }

  componentDidMount() {
    this.setState({
      loadState: 1
    })

    regions().then(res => {
      this.setState({
        loadState: 2,
        data: res,
        projectedValues: res.map(series => lastValue(series.years1965to2017))
      })
    })
  }

  _updateProjection(series, deltaX, deltaY) {
    this.setState({
      projectedValues: this.state.projectedValues.map((value, i) =>
        (series === i) ? value + deltaY * 100 : value
      )
    })
  }

  render() {
    if (!this.state.data) return null

    return (
      <React.Fragment>
        <Emissions
          data={this.state.data}
          projectedValues={this.state.projectedValues}
          onSeriesDrag={this.updateProjection}
        />
        <Warming data={this.state.data} projectedValues={this.state.projectedValues} />
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-entry')
)
