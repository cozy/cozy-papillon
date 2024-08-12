import React, { useEffect, useState } from 'react'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { buildTimetableQuery } from 'src/queries'

import { BarCenter, BarRight } from 'cozy-bar'
import { useQuery } from 'cozy-client'
import Divider from 'cozy-ui/transpiled/react/Divider'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import LoadMore from 'cozy-ui/transpiled/react/LoadMore'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { TimetableModal } from '../Dialogs/TimetableModal'

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

  const [openedCourse, setOpenedCourse] = useState(null)

  return (
    <>
      {openedCourse && (
        <TimetableModal
          course={openedCourse}
          closeModalAction={() => {
            setOpenedCourse(null)
          }}
        />
      )}

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
                        setOpenedCourse(course)
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

const CozyDatePickerInline = ({ date: def, onDateChange, textVariant }) => {
  const [date, setDate] = useState(new Date(def))
  const { t } = useI18n()

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date)
    }
  }, [date])

  const [dayDate, setDayDate] = useState(date.getDate())
  const [monthDate, setMonthDate] = useState(date.getMonth())
  const [yearDate, setYearDate] = useState(date.getFullYear())

  const daySelectRef = React.useRef(null)
  const monthSelectRef = React.useRef(null)
  const yearSelectRef = React.useRef(null)

  const [dayMenuOpen, setDayMenuOpen] = useState(false)
  const [monthMenuOpen, setMonthMenuOpen] = useState(false)
  const [yearMenuOpen, setYearMenuOpen] = useState(false)

  const getDaysInMonth = month => {
    const res = new Date(date.getFullYear(), month, 0).getDate()
    console.log(res)
    return res
  }

  const getMondaysInMonth = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate()
    const mondays = []

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      if (date.getDay() === 1) {
        // 1 represents Monday
        mondays.push(day)
      }
    }

    return mondays
  }

  useEffect(() => {
    const mondaysInNewMonth = getMondaysInMonth(yearDate, monthDate + 1)

    let newDayDate = dayDate
    if (!mondaysInNewMonth.includes(dayDate)) {
      // Find the closest Monday in the new month
      newDayDate = mondaysInNewMonth.reduce((closest, current) =>
        Math.abs(current - dayDate) < Math.abs(closest - dayDate) ? current : closest
      )
    }

    setDate(new Date(yearDate, monthDate, newDayDate))
  }, [dayDate, monthDate, yearDate])

  return (
    <div
      style={{
        display: 'flex',
        gap: textVariant == 'h5' ? '6px' : '12px'
      }}
    >
      <DropdownButton
        ref={daySelectRef}
        onClick={() => setDayMenuOpen(true)}
        textVariant={textVariant}
      >
        {date.toLocaleDateString('default', {
          day: '2-digit'
        })}
      </DropdownButton>

      <DropdownButton
        ref={monthSelectRef}
        onClick={() => setMonthMenuOpen(true)}
        textVariant={textVariant}
      >
        {date.toLocaleDateString('default', {
          month: 'long'
        })}
      </DropdownButton>

      <DropdownButton
        ref={yearSelectRef}
        onClick={() => setYearMenuOpen(true)}
        textVariant={textVariant}
      >
        {date.toLocaleDateString('default', {
          year: 'numeric'
        })}
      </DropdownButton>

      <Menu
        open={dayMenuOpen}
        anchorEl={daySelectRef.current}
        keepMounted
        onClose={() => setDayMenuOpen(false)} 
      >
        {getMondaysInMonth(yearDate, monthDate + 1).map(i => (
          <MenuItem
            key={i}
            selected={i === date.getDate()}
            onClick={() => {
              setDayDate(i)
              setDayMenuOpen(false)
            }}
          >
            {i} {t('Timetable.to')} {(i + 6) % getDaysInMonth(monthDate)}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        open={monthMenuOpen}
        anchorEl={monthSelectRef.current}
        keepMounted
        onClose={() => setMonthMenuOpen(false)}
      >
        {[...Array(12).keys()].map(i => (
          <MenuItem
            key={i}
            selected={i === date.getMonth()}
            onClick={() => {
              setMonthDate(i)
              setMonthMenuOpen(false)
            }}
          >
            {new Date(0, i).toLocaleDateString('default', { month: 'long' })}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        open={yearMenuOpen}
        anchorEl={yearSelectRef.current}
        keepMounted
        onClose={() => setYearMenuOpen(false)}
      >
        {[...Array(30).keys()].map(i => (
          <MenuItem
            key={i}
            selected={date.getFullYear() + i - 10 === date.getFullYear()}
            onClick={() => {
              setYearDate(date.getFullYear() + i - 10)
              setYearMenuOpen(false)
            }}
          >
            {date.getFullYear() + i - 10}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
