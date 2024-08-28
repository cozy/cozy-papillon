import React from 'react'

import { BarCenter, BarRight } from 'cozy-bar'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { AccountSwitcher } from './AccountSwitcher'

export const TabTitle = ({ title, children, loading }) => {
  const { isMobile } = useBreakpoints()

  return (
    <>
      {!isMobile ? (
        <>
          <Paper
            square
            elevation={0}
            className="u-p-1 u-w-100 u-flex u-flex-row u-flex-items-center u-flex-justify-between"
          >
            <AccountSwitcher />

            {children}
          </Paper>
        </>
      ) : (
        <>
          <BarCenter>
            <AccountSwitcher />
          </BarCenter>
          <BarRight>
            {children}
          </BarRight>
        </>
      )}

      {loading && <LinearProgress />}
    </>
  )
}
