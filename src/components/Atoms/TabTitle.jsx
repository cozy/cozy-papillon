import React from 'react'

import { BarCenter } from 'cozy-bar'
import Paper from 'cozy-ui/transpiled/react/Paper'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { AccountSwitcher } from './AccountSwitcher'

export const TabTitle = ({ children }) => {
  const { isMobile } = useBreakpoints()

  return (
    <>
      {isMobile && (
        <BarCenter>
          <AccountSwitcher />
        </BarCenter>
      )}

      {!isMobile || children ? (
        <Paper
          square
          elevation={0}
          style={{
            height: 68,
            minHeight: 68
          }}
          className="u-p-1 u-w-100 u-flex u-flex-row u-flex-items-center u-flex-justify-between"
        >
          {!isMobile && <AccountSwitcher />}

          {children}
        </Paper>
      ) : null}
    </>
  )
}
