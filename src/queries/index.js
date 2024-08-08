import doctypes from 'src/doctypes'

import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

const client = CozyClient.fromDOM({
  doctypes
})

export const buildHomeworkQuery = () => ({
  definition: () =>
    Q('io.cozy.calendar.todos')
      .where({
        _id: { $gt: null }
      })
      .sortBy([{ dueDate: 'desc' }, { _id: 'desc' }])
      .indexFields(['dueDate', '_id']),
  options: {
    as: 'io.cozy.calendar.todos',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildGradesQuery = () => ({
  definition: () =>
    Q('io.cozy.timeseries.grades'),
  options: {
    as: 'io.cozy.timeseries.grades',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildPresenceQuery = () => ({
  definition: () =>
    Q('io.cozy.calendar.presence')
      .where({
        _id: { $gt: null }
      })
      .sortBy([{ start: 'desc' }, { _id: 'desc' }])
      .indexFields(['start', '_id']),
  options: {
    as: 'io.cozy.calendar.presence',
    fetchPolicy: defaultFetchPolicy
  }
})
