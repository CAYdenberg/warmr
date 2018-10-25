import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {XYPlot, MarkSeries, Voronoi} from 'react-vis'

storiesOf('XYPlot', module)
  .add('Voronoi events', () => {
    const data = [
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]

    return (
      <XYPlot
        width={400}
        height={400}
        onMouseMove={action('XYPlotMouseMove')}
        onTouchMove={action('XYPlotTouchMove')}
        xDomain={[0, 5]}
        yDomain={[0, 5]}
      >
        <MarkSeries data={data} />
        <Voronoi nodes={data} />
      </XYPlot>
    )
  })
