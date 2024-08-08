import doctypes from 'src/doctypes'

import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

const client = CozyClient.fromDOM({
  doctypes
})

export const getAllGrades = async () => {
  const data = await client.queryAll(Q('io.cozy.timeseries.grades'))

  return data
}

export const getAllPresence = async () => {
  const data = await client.queryAll(Q('io.cozy.calendar.presence'))

  return data
}

export const getAllHomeworks = async () => {
  const data = await client.queryAll(Q('io.cozy.calendar.todos'))

  return data
}

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
