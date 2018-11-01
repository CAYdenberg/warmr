import React from 'react'

import {SERIES_COLORS} from './constants'

const SlopeForm = props =>
  <form className="is-expanded">
    {props.names.map((name, i) =>
      <div className="field" key={name}>
        <label className="label slope-form__label" style={{color: SERIES_COLORS[i]}}>
          {name}
        </label>

        <div className="control">
          <input
            type="range"
            min="-600"
            max="600"
            step="20"
            className="is-expanded"
            value={props.slopes[i]}
            onChange={(e) => props.assignSlope(i, Number(e.target.value))}
          />
        </div>
      </div>
    )}
  </form>

export default SlopeForm
