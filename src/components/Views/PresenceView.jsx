import React, { useState } from 'react'
import { ChipsList } from 'src/components/ChipsList/ChipsList'
import { Titlebar } from 'src/components/Titlebar'

import minilog from 'cozy-minilog'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Dots from 'cozy-ui/transpiled/react/Icons/Dots'
import Paperplane from 'cozy-ui/transpiled/react/Icons/Paperplane'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const makeStyle = isMobile => ({
  header: {
    display: 'flex',
    padding: '1.5rem 2rem',
    justifyContent: 'space-between'
  },
  titlebar: {
    maxwidth: '100%',
    flex: 2
  },
})

export const PresenceView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  return (
    <>
      <div>
        <p>Presence</p>
      </div>
    </>
  )
};