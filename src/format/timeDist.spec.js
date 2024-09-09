import { timeDist } from './timeDist'

describe('timeDist', () => {
  it('timeDist should return correct time difference when hours and minutes are present', () => {
    const timeStart = new Date('2022-01-01T10:00:00')
    const timeEnd = new Date('2022-01-01T12:30:00')
    expect(timeDist(timeStart, timeEnd)).toBe('2h 30min')
  })

  it('timeDist should return correct time difference when only minutes are present', () => {
    const timeStart = new Date('2022-01-01T10:00:00')
    const timeEnd = new Date('2022-01-01T10:30:00')
    expect(timeDist(timeStart, timeEnd)).toBe('30min')
  })

  it('timeDist should return correct time difference when only hours are present', () => {
    const timeStart = new Date('2022-01-01T10:00:00')
    const timeEnd = new Date('2022-01-01T12:00:00')
    expect(timeDist(timeStart, timeEnd)).toBe('2h 0min')
  })

  it('timeDist should return "0min" when time difference is less than a minute', () => {
    const timeStart = new Date('2022-01-01T10:00:00')
    const timeEnd = new Date('2022-01-01T10:00:30')
    expect(timeDist(timeStart, timeEnd)).toBe('0min')
  })
})
