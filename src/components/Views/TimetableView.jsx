import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { buildTimetableQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import { CircularProgress } from 'cozy-ui/transpiled/react/Progress'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { TabTitle } from '../Atoms/TabTitle'
import { CozyDatePickerInline } from '../Atoms/Timetable/CozyDatePickerInline'
import { TimetableDay } from '../Atoms/Timetable/TimetableDay'
import { AccountContext } from '../Provider/AccountProvider'

export const TimetableView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const { currentAccount } = useContext(AccountContext)

  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    let nsd = new Date(startDate)
    nsd.setDate(nsd.getDate() - (nsd.getDay() - 1))
    nsd.setHours(0, 0, 0, 0)

    if (nsd.getDate() !== startDate.getDate()) {
      setStartDate(new Date(nsd))
    }
  }, [startDate])

  const endDate = useMemo(() => {
    const date = new Date(startDate)

    date.setDate(date.getDate() + 6)
    return date
  }, [startDate])

  const timetableQuery = buildTimetableQuery(
    currentAccount?.name,
    startDate,
    endDate
  )

  const { data: courses, fetchStatus } = useQuery(
    timetableQuery.definition,
    timetableQuery.options
  )

  // list 6 days (monday to saturday)
  const days = useMemo(() => {
    return [...Array(6).keys()].map(i => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      date.setHours(0, 0, 0, 0)
      return date
    })
  }, [startDate])

  const timetable = useMemo(() => {
    return (courses ?? []).reduce((acc, course) => {
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
  }, [courses])

  return (
    <>
      <Outlet />

      <div>
        <TabTitle
          title={
            !isMobile ? (
              t('Timetable.title')
            ) : (
              <CozyDatePickerInline
                date={startDate}
                onDateChange={date => setStartDate(date)}
                textVariant="h5"
              />
            )
          }
        >
          {!isMobile && (
            <CozyDatePickerInline
              date={startDate}
              onDateChange={date => setStartDate(date)}
              textVariant="subtitle1"
            />
          )}
        </TabTitle>

        {timetable.length !== 0 ? (
          <div
            style={{
              flexDirection: !isMobile ? 'row' : 'column'
            }}
            className="u-flex u-w-100 u-h-100"
          >
            {(days ?? []).map(day => {
              // If it's saturday and there are no courses, don't show the day
              if (
                day.getDay() === 6 &&
                !timetable.find(group => group.date === day.toISOString())
              ) {
                return null
              }

              return (
                <TimetableDay
                  day={day}
                  timetable={timetable}
                  key={day.toISOString()}
                />
              )
            })}
          </div>
        ) : (
          <div className="u-flex u-flex-column u-flex-justify-center u-flex-items-center u-p-1 u-w-100 u-h-100">
            {fetchStatus === 'loading' ? (
              <CircularProgress />
            ) : (
              <Typography variant="h6" color="textSecondary">
                {t('Timetable.noCourses')}
              </Typography>
            )}
          </div>
        )}
      </div>
    </>
  )
}
