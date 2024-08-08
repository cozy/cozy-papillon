import doctypes from 'src/doctypes'

import CozyClient, { Q } from 'cozy-client'

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
