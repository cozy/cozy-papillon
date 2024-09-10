import React, { useEffect, useState } from 'react'

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import LeftIcon from 'cozy-ui/transpiled/react/Icons/Left'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Paper from 'cozy-ui/transpiled/react/Paper'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const uppercaseFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const CozyDatePickerInline = ({ date: def, onDateChange }) => {
  const [date, setDate] = useState(new Date(def))
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date)
    }
  }, [date])

  const daySelectRef = React.useRef(null)
  const monthSelectRef = React.useRef(null)
  const yearSelectRef = React.useRef(null)

  const [dayMenuOpen, setDayMenuOpen] = useState(false)
  const [monthMenuOpen, setMonthMenuOpen] = useState(false)
  const [yearMenuOpen, setYearMenuOpen] = useState(false)

  const getDaysInMonth = (month, offset = 0) => {
    const res = new Date(date.getFullYear(), month, 0)
    res.setDate(res.getDate() + offset)
    return res.getDate()
  }

  const getMondaysInMonth = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate()
    const mondays = []

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      if (date.getDay() === 1) {
        // 1 represents Monday
        mondays.push(day)
      }
    }

    return mondays
  }

  const handleDayChange = i => {
    const newDay = i
    setDate(new Date(date.getFullYear(), date.getMonth(), newDay))
  }

  const handleMonthChange = i => {
    const newMonth = i
    setDate(new Date(date.getFullYear(), newMonth, date.getDate()))
  }

  const handleYearChange = i => {
    const newYear = date.getFullYear() + i - 10
    setDate(new Date(newYear, date.getMonth(), date.getDate()))
  }

  useEffect(() => {
    const mondaysInNewMonth = getMondaysInMonth(
      date.getFullYear(),
      date.getMonth()
    )

    let newDayDate = date.getDate()
    if (!mondaysInNewMonth.includes(date.getDate())) {
      // Find the closest Monday in the new month
      newDayDate = mondaysInNewMonth.reduce((closest, current) =>
        Math.abs(current - date.getDate()) < Math.abs(closest - date.getDate())
          ? current
          : closest
      )
      if (newDayDate != date.getDate()) {
        setDate(new Date(date.getFullYear(), date.getMonth(), newDayDate))
      }
    }
  }, [date])

  const goToPrevWeek = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - 7)
    setDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + 7)
    setDate(newDate)
  }

  const textVariant = 'body1'
  const elevation = 4

  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        width: isMobile ? '100%' : 'auto'
      }}
    >
      <Paper
        elevation={elevation}
        style={{
          height: 40,
          padding: '0 8px',
          overflow: 'hidden',
          borderRadius: 40,
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '100%' : 'auto'
        }}
      >
        <DropdownButton
          ref={daySelectRef}
          onClick={() => setDayMenuOpen(true)}
          textVariant={textVariant}
          style={{
            height: '100%',
            paddingLeft: 16
          }}
        >
          {date.toLocaleDateString('default', {
            day: '2-digit'
          })}
          -{(date.getDate() + 6) % getDaysInMonth(date.getMonth() + 1)}
        </DropdownButton>

        <DropdownButton
          ref={monthSelectRef}
          onClick={() => setMonthMenuOpen(true)}
          textVariant={textVariant}
          style={{
            height: '100%',
            width: isMobile ? '100%' : 'auto'
          }}
        >
          {uppercaseFirst(
            date.toLocaleDateString('default', {
              month: 'long'
            })
          )}
        </DropdownButton>

        <DropdownButton
          ref={yearSelectRef}
          onClick={() => setYearMenuOpen(true)}
          textVariant={textVariant}
          style={{
            height: '100%',
            paddingRight: 16
          }}
        >
          {date.toLocaleDateString('default', {
            year: 'numeric'
          })}
        </DropdownButton>
      </Paper>

      <Paper
        elevation={elevation}
        style={{
          height: 40,
          width: 40,
          minWidth: 40,
          overflow: 'hidden',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconButton size="large" onClick={() => goToPrevWeek()}>
          <Icon icon={LeftIcon} />
        </IconButton>
      </Paper>

      <Paper
        elevation={elevation}
        style={{
          height: 40,
          width: 40,
          minWidth: 40,
          overflow: 'hidden',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconButton size="large" onClick={() => goToNextWeek()}>
          <Icon icon={RightIcon} />
        </IconButton>
      </Paper>

      <Menu
        open={dayMenuOpen}
        anchorEl={daySelectRef.current}
        keepMounted
        onClose={() => setDayMenuOpen(false)}
      >
        {getMondaysInMonth(date.getFullYear(), date.getMonth()).map(i => (
          <MenuItem
            key={i}
            selected={i === date.getDate()}
            onClick={() => {
              handleDayChange(i)
              setDayMenuOpen(false)
            }}
          >
            {i} {t('Timetable.to')}{' '}
            {(i + 6) % getDaysInMonth(date.getMonth() + 1)}
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
              handleMonthChange(i)
              setMonthMenuOpen(false)
            }}
          >
            {uppercaseFirst(
              new Date(0, i).toLocaleDateString('default', { month: 'long' })
            )}
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
              handleYearChange(i)
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
