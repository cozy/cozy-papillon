import PropTypes from 'prop-types'
import React from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import ActionsMenuWrapper from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuWrapper'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'

const Item = ({ label }) => {
  return (
    <ActionsMenuItem>
      <Checkbox label={label} checked />
    </ActionsMenuItem>
  )
}

/**
 * Mocked component for Demo purposes
 */
export const ActionsMenuChip = React.forwardRef(
  ({ open, onClose, labels }, ref) => {
    return (
      <ActionsMenuWrapper
        open={open}
        anchorEl={ref.current}
        className="ActionsMenuChip"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={onClose}
      >
        {labels.map((label, idx) => (
          <Item key={idx} label={label} />
        ))}
      </ActionsMenuWrapper>
    )
  }
)

ActionsMenuChip.displayName = 'ActionsMenuChip'

ActionsMenuChip.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}
