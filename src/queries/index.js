import doctypes from 'src/doctypes'

import CozyClient, { Q } from 'cozy-client'

const client = CozyClient.fromDOM({
  doctypes
})

export const getAllGrades = async (period = 'Semestre 1') => {
  const data = await client.queryAll(
    Q('io.cozy.timeseries.grades').where({ title: period })
  )

  return data
}
