import React from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { PeriodSelectorButton } from './PeriodSelectorButton'
import { YearSelectorButton } from './YearSelectorButton'

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
  const { isMobile } = useBreakpoints()
  const elevation = 4

  return (
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
    </Paper>
  )
}
