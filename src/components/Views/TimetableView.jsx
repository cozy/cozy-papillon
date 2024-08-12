import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { buildTimetableQuery } from 'src/queries'

import { BarCenter, BarRight } from 'cozy-bar'
import { useQuery } from 'cozy-client'
import Divider from 'cozy-ui/transpiled/react/Divider'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { CozyDatePickerInline } from '../Atoms/CozyDatePickerInline'

const makeStyle = isMobile => ({
  header: {
    display: 'flex',
    padding: '1.5rem 2rem',
    justifyContent: 'space-between'
  },
  titlebar: {
    maxwidth: '100%',
    flex: 2
  }
})

export const TimetableView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date('2024-03-01'))
  startDate.setDate(startDate.getDate() - (startDate.getDay() - 1))

  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  const timetableQuery = buildTimetableQuery(startDate, endDate)
  const {
    data: courses,
    fetchStatus,
    fetch,
    fetchMore
  } = useQuery(timetableQuery.definition, timetableQuery.options)

  useEffect(() => {
    fetch()
  }, [startDate])

  // list 6 days (monday to saturday)
  const days = [...Array(6).keys()].map(i => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    date.setHours(0, 0, 0, 0)
    return date
  })

  // group courses by day
  const timetable = (courses ?? []).reduce((acc, course) => {
    const date = new Date(course.start)
    date.setHours(0, 0, 0, 0)
    const day = date.toISOString()
    if (acc.find(group => group.date === day)) {
      return acc.map(group => {
        if (group.date === day) {
          return {
            ...group,
            courses: [...group.courses, course]
          }
        }
        return group
      })
    }

    return [
      ...acc,
      {
        date: date.toISOString(),
        courses: [course]
      }
    ]
  }, [])

  return (
    <>
      <Outlet />

      <div>
        {!isMobile ? (
          <>
            <Paper
              square
              style={{
                padding: '16px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="h4" color="textPrimary">
                {t('Timetable.title')}
              </Typography>

              <CozyDatePickerInline
                date={startDate}
                onDateChange={date => setStartDate(date)}
                textVariant="subtitle1"
              />
            </Paper>

            <Divider />
          </>
        ) : (
          <>
            <BarCenter>
              <Typography variant="h5">{t('Timetable.title')}</Typography>
            </BarCenter>
            <BarRight>
              <CozyDatePickerInline
                date={startDate}
                onDateChange={date => setStartDate(date)}
                textVariant="subtitle1"
              />
            </BarRight>
          </>
        )}

        <Divider />

        <div
          style={{
            display: 'flex',
            flexDirection: !isMobile ? 'row' : 'column',
            height: '100%'
          }}
        >
          {(days ?? []).map(day => {
            // is saturday and no courses
            if (
              day.getDay() === 6 &&
              !timetable.find(group => group.date === day.toISOString())
            ) {
              return null
            }

            return (
              <div
                key={day.toISOString()}
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  overflowX: 'hidden'
                }}
              >
                <List>
                  <ListSubheader>
                    {day.toLocaleDateString('default', {
                      weekday: 'long',
                      day: '2-digit'
                    })}
                  </ListSubheader>

                  {(
                    timetable.find(
                      group => group.date === day.toISOString()
                    ) ?? { courses: [] }
                  )?.courses.map(course => (
                    <ListItem
                      key={course._id}
                      button
                      onClick={() => {
                        navigate(`/timetable/course/${course._id}`)
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '4px',
                          height: '64px',
                          borderRadius: '50px',
                          backgroundColor: subjectColor(course.subject)
                        }}
                      />

                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              noWrap
                            >
                              {new Date(course.start).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}{' '}
                            </Typography>
                            <Typography variant="h6" color="textPrimary" noWrap>
                              {getSubjectName(course.subject).pretty}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              noWrap
                            >
                              {course.location}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              noWrap
                            >
                              {course.organizer}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
