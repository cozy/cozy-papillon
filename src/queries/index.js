import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildAccountsQuery = () => ({
  definition: () =>
    Q('io.cozy.identities')
      .where({
        cozyMetadata: {
          createdByApp: 'pronote'
        }
      })
      .indexFields(['cozyMetadata.createdByApp']),
  options: {
    as: 'io.cozy.identities/pronote',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildTimetableQuery = (sourceAccountIdentifier, start, end) => ({
  definition: () =>
    Q('io.cozy.calendar.events')
      .where({
        cozyMetadata: {
          sourceAccountIdentifier
        },
        start: end ? { $lte: end, $gte: start } : { $gte: start }
      })
      .indexFields(['cozyMetadata.sourceAccountIdentifier', 'start']),
  options: {
    as:
      'io.cozy.calendar.events/account/' +
      sourceAccountIdentifier +
      '/start/' +
      start +
      '/end/' +
      end,
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
      .indexFields(['cozyMetadata.sourceAccountIdentifier', 'dueDate'])
      .sortBy([
        { 'cozyMetadata.sourceAccountIdentifier': 'desc' },
        { dueDate: 'desc' }
      ]),
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
      .indexFields(['cozyMetadata.sourceAccountIdentifier', 'title']),
  options: {
    as:
      'io.cozy.timeseries.grades/account/' +
      sourceAccountIdentifier +
      '/period/' +
      period,
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

export const buildPresenceQuery = sourceAccountIdentifier => ({
  definition: () =>
    Q('io.cozy.calendar.presence')
      .where({
        start: { $gt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .sortBy([{ start: 'desc' }])
      .indexFields(['cozyMetadata.sourceAccountIdentifier', 'start']),
  options: {
    as: 'io.cozy.calendar.presence/account/' + sourceAccountIdentifier,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildAccountQuery = () => ({
  definition: () =>
    Q('io.cozy.accounts').partialIndex({
      account_type: 'pronote'
    }),
  options: {
    as: 'io.cozy.files/account_type/pronote',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildTriggerQuery = accountId => ({
  definition: () =>
    Q('io.cozy.triggers')
      .where({
        message: {
          account: accountId
        }
      })
      .partialIndex({
        message: {
          konnector: 'pronote'
        }
      })
      .indexFields(['message.account']),
  options: {
    as: 'io.cozy.triggers/konnector/pronote/account/' + accountId,
    fetchPolicy: defaultFetchPolicy
  }
})
