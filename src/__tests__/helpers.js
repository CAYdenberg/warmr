import {
  lastValue,
  isLastValue,
  fillInLinear,
  integrateData,
  integrateLinear,
  sumSeries
} from '../helpers'

describe('lastValue', () => {
  it('should find the last value in an array', () => {
    expect(lastValue([1, 2, 5])).toEqual(5)
  })
})

describe('isLastValue', () => {
  it('should return true if the last value matches', () => {
    expect(isLastValue([1, 2, 5], 5)).toBeTruthy()
  })

  it('should return false if the last value does not match', () => {
    expect(isLastValue([1, 2, 5], 3)).toBeFalsy()
  })
})

describe('fillInLinear', () => {
  it('should calculate a series of linear data points from a two points', () => {
    const startPoint = {x: 0, y: 0}
    const endPoint = {x: 4, y: 4}
    const spacing = 2
    const result = fillInLinear(startPoint, endPoint, spacing)
    expect(result).toEqual([
      {x: 0, y: 0},
      {x: 2, y: 2},
      {x: 4, y: 4}
    ])
  })
})

describe('integrateData', () => {
  it('should add up a series of datapoints', () => {
    const input = [1, 2, 3, 4]
    expect(integrateData(input)).toEqual([1, 3, 6, 10])
  })
})

describe('integrateLinear', () => {
  it('should calculate the area under a line from two y-coords and the distance between them', () => {
    expect(integrateLinear(0, 4, 4)).toEqual([0, 1, 3, 6, 10])
  })
})

describe('sumSeries', () => {
  it('should sum the contained dimension of a 2D array', () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6]
    ]
    const expected = [5, 7, 9]
    expect(sumSeries(input)).toEqual(expected)
  })
})