import React from 'react'

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'

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
        style={{
          height: '100%',
          paddingRight: 16
        }}
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
