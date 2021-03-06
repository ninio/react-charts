/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import source from '!raw!./CustomCursors'
import CodeHighlight from './components/codeHighlight'
//
import { Chart, Axis, Series, Tooltip, Cursor, Line, Brush } from '../../../lib'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      min: null,
      max: null,
      data: makeData()
    }
  }
  render() {
    const { data, min, max } = this.state
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              data: makeData()
            })}
        >
          Randomize Data
        </button>
        <button
          onClick={() =>
            this.setState({
              min: null,
              max: null
            })}
        >
          Reset Zoom
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) =>
          <ResizableBox key={i} width={500} height={300}>
            <Chart data={data} getData={d => d.data}>
              <Axis
                primary
                type="time"
                position="bottom"
                hardMin={min}
                hardMax={max}
              />
              <Axis type="linear" position="left" />
              <Series type={Line} />
              <Brush
                onSelect={brushData => {
                  this.setState({
                    min: Math.min(brushData.start, brushData.end),
                    max: Math.max(brushData.start, brushData.end)
                  })
                }}
              />
            </Chart>
          </ResizableBox>
        )}

        <br />
        <br />
        <CodeHighlight>
          {() => source}
        </CodeHighlight>
      </div>
    )
  }
}

export default () => <Story />

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 4), 1)), makeSeries)
}

function makeSeries(i) {
  const startDate = new Date()
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  // const multiplier = 10
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
  return {
    label: 'Series ' + (i + 1),
    data: _.map(_.range(length), d => ({
      // x: d * multiplier,
      x: new Date().setMinutes(startDate.getMinutes() + 30 * d),
      y: Math.round(Math.random() * max + Math.round(Math.random() * 50)),
      r: Math.round(Math.random() * 5)
    }))
  }
}
