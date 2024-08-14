import React from 'react'

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'

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
