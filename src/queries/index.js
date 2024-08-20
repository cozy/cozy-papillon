import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildTimetableQuery = (start, end) => ({
  definition: () =>
    Q('io.cozy.calendar.events')
      .where({
        start: start ? { $gte: start } : { $gt: null },
        end: end ? { $lte: end } : { $lt: null }
      })
      .indexFields(['start', 'end']),
  options: {
    as: 'io.cozy.calendar.events/start/' + start + '/end/' + end,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildTimetableItemQuery = id => ({
  definition: () => Q('io.cozy.calendar.events').getById(id),
  options: {
    as: 'io.cozy.calendar.events/' + id,
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
})

export const buildHomeworkQuery = () => ({
  definition: () =>
    Q('io.cozy.calendar.todos')
      .where({
        dueDate: { $gt: null }
      })
      .sortBy([{ dueDate: 'desc' }])
      .indexFields(['dueDate']),
  options: {
    as: 'io.cozy.calendar.todos',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildHomeworkItemQuery = id => ({
  definition: () => Q('io.cozy.calendar.todos').getById(id),
  options: {
    as: 'io.cozy.calendar.todos/' + id,
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
})

export const buildGradesQuery = period => ({
  definition: () =>
    Q('io.cozy.timeseries.grades')
      .where({
        title: period || { $gt: null }
      })
      .indexFields(['title']),
  options: {
    as: 'io.cozy.timeseries.grades/period/' + period,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildGradeItemQuery = id => ({
  definition: () => Q('io.cozy.timeseries.grades').getById(id),
  options: {
    as: 'io.cozy.timeseries.grades/' + id,
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
})

export const buildPresenceQuery = () => ({
  definition: () =>
    Q('io.cozy.calendar.presence')
      .where({
        start: { $gt: null }
      })
      .sortBy([{ start: 'desc' }])
      .indexFields(['start']),
  options: {
    as: 'io.cozy.calendar.presence',
    fetchPolicy: defaultFetchPolicy
  }
})
