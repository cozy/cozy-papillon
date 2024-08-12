import React, { useEffect, useState } from 'react'

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const CozyDatePickerInline = ({
  date: def,
  onDateChange,
  textVariant
}) => {
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
        Math.abs(current - dayDate) < Math.abs(closest - dayDate)
          ? current
          : closest
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