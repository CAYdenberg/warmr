import React from 'react'
import ReactDOM from 'react-dom'
import './App.scss'

import {regions} from './api'
import {DRAG_SENSITIVITY, INCREMENT_SENSITIVITY} from './constants'
import SlopeForm from './SlopeForm'
import Emissions from './Emissions'
import Warming from './Warming'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      slopes: [],
      loadState: 0,
    }

    this.updateSlope = this._updateSlope.bind(this)
    this.handleSeriesDrag = this._handleSeriesDrag.bind(this)
    this.increment = this._increment.bind(this)
    this.decrement = this._decrement.bind(this)
  }

  componentDidMount() {
    this.setState({
      loadState: 1
    })

    regions().then(res => {
      this.setState({
        loadState: 2,
        data: res,
        slopes: res.map(() => 1)
      })
    })
  }

  _updateSlope(series, change) {
    this.setState(state => {
      return {
        ...state,
        slopes: state.slopes.map((value, i) =>
          (series === i) ? change(value) : value
        )
      }
    })
  }

  _handleSeriesDrag(series, deltaX, deltaY) {
    this.updateSlope(series, value => value + DRAG_SENSITIVITY * deltaY)
  }

  _increment(series) {
    this.updateSlope(series, value => value + INCREMENT_SENSITIVITY)
  }

  _decrement(series) {
    this.updateSlope(series, value => value - INCREMENT_SENSITIVITY)
  }

  render() {
    if (!this.state.data) {
      return <progress className="progress is-small is-primary" value="60" max="100">60%</progress>
    }

    const names = this.state.data.map(series => series.name)
    const slopes = this.state.slopes

    return (
      <div className="app">
        <div className="app__emissions-container">
          <SlopeForm
            names={names}
            slopes={slopes}
            decrement={this.decrement}
            increment={this.increment}
          />
          <p className="is-size-6"><em>Click and drag the projections or use the controls above</em></p>
          <Emissions
            data={this.state.data}
            slopes={this.state.slopes}
            onSeriesDrag={this.handleSeriesDrag}
          />
        </div>

        <Warming
          data={this.state.data}
          slopes={this.state.slopes}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-entry')
)
