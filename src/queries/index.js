import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildAccountsQuery = () => ({
  definition: () =>
    Q('io.cozy.accounts')
      .where({
        account_type: 'pronote'
      })
      .indexFields(['account_type']),
  options: {
    as: 'io.cozy.accounts/pronote',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildTimetableQuery = (sourceAccountIdentifier, start, end) => ({
  definition: () =>
    Q('io.cozy.calendar.events')
      .where({
        start: start ? { $gte: start } : { $gt: null },
        end: end ? { $lte: end } : { $lt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .indexFields(['start', 'end', 'cozyMetadata.sourceAccountIdentifier']),
  options: {
    as:
      'io.cozy.calendar.events/start/' +
      start +
      '/end/' +
      end +
      '/account/' +
      sourceAccountIdentifier,
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

export const buildHomeworkQuery = sourceAccountIdentifier => ({
  definition: () =>
    Q('io.cozy.calendar.todos')
      .where({
        dueDate: { $gt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .sortBy([{ dueDate: 'desc' }])
      .indexFields(['dueDate', 'cozyMetadata.sourceAccountIdentifier']),
  options: {
    as: 'io.cozy.calendar.todos/account/' + sourceAccountIdentifier,
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

export const buildGradesQuery = (sourceAccountIdentifier, period) => ({
  definition: () =>
    Q('io.cozy.timeseries.grades')
      .where({
        title: period || { $gt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .indexFields(['title', 'cozyMetadata.sourceAccountIdentifier']),
  options: {
    as:
      'io.cozy.timeseries.grades/period/' +
      period +
      '/account/' +
      sourceAccountIdentifier,
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

export const buildPresenceQuery = (sourceAccountIdentifier) => ({
  definition: () =>
    Q('io.cozy.calendar.presence')
      .where({
        start: { $gt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .sortBy([{ start: 'desc' }])
      .indexFields(['start', 'cozyMetadata.sourceAccountIdentifier']),
  options: {
    as: 'io.cozy.calendar.presence/account/' + sourceAccountIdentifier,
    fetchPolicy: defaultFetchPolicy
  }
})
