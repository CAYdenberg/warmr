import {
  lastValue,
  isLastValue,
  createLinearSeries,
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

describe('createLinearSeries', () => {
  it('should calculate a series from a startPoint, slope and number of data points', () => {
    const result = createLinearSeries(0, 1, 4)
    expect(result).toEqual([0, 1, 2, 3, 4])
  })

  it('should bottom out at 0', () => {
    const result = createLinearSeries(2, -1, 4)
    expect(result).toEqual([2, 1, 0, 0, 0])
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
    expect(integrateLinear(0, 1, 4)).toEqual([0, 1, 3, 6, 10])
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
