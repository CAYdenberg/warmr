import React from 'react'
import ReactDOM from 'react-dom'
import './App.scss'

import {regions} from './api'
import SlopeForm from './SlopeForm'
import Emissions from './Emissions'
import Warming from './Warming'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      projectedValues: [],
      loadState: 0,
    }

    this.updateProjection = this._updateProjection.bind(this)
    this.assignSlope = this._assignSlope.bind(this)
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

  _updateProjection(series, deltaX, deltaY) {
    this.setState(state => {
      return {
        ...state,
        slopes: state.slopes.map((value, i) =>
          (series === i) ? value + 3 * deltaY : value
        )
      }
    })
  }

  _assignSlope(series, newSlope) {
    this.setState(state => {
      return {
        ...state,
        slopes: state.slopes.map((value, i) =>
          (series === i) ? newSlope : value
        )
      }
    })
  }

  render() {
    if (!this.state.data) {
      return <progress class="progress is-small is-primary" value="60" max="100">60%</progress>
    }

    const names = this.state.data.map(series => series.name)
    const slopes = this.state.slopes

    return (
      <React.Fragment>
        <div className="is-flex-tablet">
          <SlopeForm
            names={names}
            slopes={slopes}
            assignSlope={this.assignSlope}
          />
          <Emissions
            data={this.state.data}
            slopes={this.state.slopes}
            onSeriesDrag={this.updateProjection}
          />
        </div>

        <Warming
          data={this.state.data}
          slopes={this.state.slopes}
        />
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-entry')
)
