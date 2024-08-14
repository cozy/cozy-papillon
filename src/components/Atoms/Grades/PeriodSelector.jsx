import React from 'react'

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