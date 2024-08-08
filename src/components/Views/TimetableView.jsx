import React, { useState } from 'react'
import { getAllPresence } from 'src/queries'

import Divider from 'cozy-ui/transpiled/react/Divider'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import ListSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListSkeleton'
import Typography from 'cozy-ui/transpiled/react/Typography'
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
  }
})

export const TimetableView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const [presenceEvents, setPresenceEvents] = useState([])

  const fetchPresenceEvents = async () => {
    // fetch presence events
    return getAllPresence().then(data => {
      console.log(data)
      return setPresenceEvents(data)
    })
  }

  React.useEffect(() => {
    fetchPresenceEvents()
  }, [])

  return (
    <>
      <div>
        <Paper
          square
          style={{
            padding: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4" color="textPrimary">
            {t('Presence.title')}
          </Typography>
        </Paper>

        <Divider />
      </div>
    </>
  )
}
