import React from 'react'

import {SERIES_COLORS} from './constants'

const SlopeForm = props =>
  <ul className="slope-form">
    {props.names.map((name, i) =>
      <li className="slope-form__item" style={{color: SERIES_COLORS[i]}} key={name}>
        <span className="slope-form__label">{name}</span>
        <div className="field has-addons slope-form__controls">
          <p className="control">
            <button type="button" className="button is-small" onClick={() => props.decrement(i)}> - </button>
          </p>
          <p className="control">
            <button type="button" className="button is-small" onClick={() => props.increment(i)}> + </button>
          </p>
        </div>
      </li>
    )}
  </ul>

export default SlopeForm
