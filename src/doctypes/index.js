// the documents schema, necessary for CozyClient
export default {
  timetable: {
    doctype: 'io.cozy.calendar.events'
  },
  homeworks: {
    doctype: 'io.cozy.calendar.todos'
  },
  grades: {
    doctype: 'io.cozy.timeseries.grades'
  },
  presence: {
    doctype: 'io.cozy.calendar.presence'
  }
}
