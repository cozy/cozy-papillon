import React from 'react'

import { BarCenter, BarRight } from 'cozy-bar'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

export const TabTitle = ({ title, children, loading }) => {
  const { isMobile } = useBreakpoints()

  return (
    <>
      {!isMobile ? (
        <>
          <Paper
            square
            className="u-p-1 u-w-100 u-flex u-flex-row u-flex-items-center u-flex-justify-between"
          >
            <Typography variant="h4" color="textPrimary">
              {title}
            </Typography>

            {children}
          </Paper>
        </>
      ) : (
        <>
          <BarCenter>
            <Typography variant="h5">{title}</Typography>
          </BarCenter>
          <BarRight>{children}</BarRight>
        </>
      )}

      {loading && <LinearProgress />}

      {!isMobile && <Divider />}
    </>
  )
}
