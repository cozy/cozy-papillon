import React from 'react'

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'

export const PeriodSelector = ({
  periodDropdownRef,
  yearDropdownRef,
  selectedPeriod,
  setSelectedPeriod,
  selectedYear,
  setSelectedYear,
  setPeriodMenuOpen,
  periodMenuOpen,
  setYearMenuOpen,
  yearMenuOpen,
  allPeriods,
  periods,
  years,
  t
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <PeriodSelectorButton
        periodDropdownRef={periodDropdownRef}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        setPeriodMenuOpen={setPeriodMenuOpen}
        periodMenuOpen={periodMenuOpen}
        periods={periods}
        t={t}
      />

      <YearSelectorButton
        yearDropdownRef={yearDropdownRef}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        setYearMenuOpen={setYearMenuOpen}
        yearMenuOpen={yearMenuOpen}
        allPeriods={allPeriods}
        selectedPeriod={selectedPeriod}
        years={years}
        t={t}
      />
    </div>
  )
}

export const PeriodSelectorButton = ({
  periodDropdownRef,
  selectedPeriod,
  setSelectedPeriod,
  setPeriodMenuOpen,
  periodMenuOpen,
  periods,
  t,
  textVariant
}) => {
  return (
    <>
      <DropdownButton
        ref={periodDropdownRef}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => setPeriodMenuOpen(!periodMenuOpen)}
        textVariant={textVariant}
      >
        {selectedPeriod || t('Grades.selectPeriod')}
      </DropdownButton>

      <Menu
        open={periodMenuOpen}
        anchorEl={periodDropdownRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        keepMounted
        onClose={() => setPeriodMenuOpen(false)}
      >
        {periods.map((period, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectedPeriod(period)
              setPeriodMenuOpen(false)
            }}
            selected={period === selectedPeriod}
          >
            <ListItemText primary={period} />
          </MenuItem>
        ))}

        {periods.length === 0 && (
          <MenuItem disabled>
            <ListItemText primary={t('Grades.emptyList.periods')} />
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export const YearSelectorButton = ({
  yearDropdownRef,
  selectedYear,
  selectedPeriod,
  setSelectedYear,
  setYearMenuOpen,
  yearMenuOpen,
  allPeriods,
  t
}) => {
  return (
    <>
      <DropdownButton
        ref={yearDropdownRef}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => setYearMenuOpen(!yearMenuOpen)}
      >
        {selectedYear || t('Grades.selectYear')}
      </DropdownButton>

      <Menu
        open={yearMenuOpen}
        anchorEl={yearDropdownRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        keepMounted
        onClose={() => setYearMenuOpen(false)}
      >
        {[
          ...new Set(
            allPeriods.filter(p => p.title === selectedPeriod).map(p => p.year)
          )
        ].map((year, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectedYear(year)
              setYearMenuOpen(false)
            }}
            selected={year === selectedYear}
          >
            <ListItemText primary={year} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
