import React from 'react'
import { buildPresenceQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import Chip from 'cozy-ui/transpiled/react/Chips'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BellIcon from 'cozy-ui/transpiled/react/Icons/Bell'
import ClockIcon from 'cozy-ui/transpiled/react/Icons/Clock'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import WalkIcon from 'cozy-ui/transpiled/react/Icons/Walk'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { TabTitle } from '../Atoms/TabTitle'
import { PresenceItem } from '../Atoms/Presence/PresenceItem'

export const PresenceView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const presenceQuery = buildPresenceQuery()
  const { data: presence, fetchStatus } = useQuery(
    presenceQuery.definition,
    presenceQuery.options
  )

  const isLoading = fetchStatus == 'loading'

  const presenceEvents = (presence ?? []).reduce((acc, event) => {
    const month = new Date(event.start).getMonth()
    if (acc.find(group => group.month === month)) {
      return acc.map(group => {
        if (group.month === month) {
          return {
            ...group,
            events: [...group.events, event]
          }
        }
        return group
      })
    }
    return [
      ...acc,
      {
        month,
        prettyMonth: new Date(event.start).toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        }),
        events: [event]
      }
    ]
  }, [])

  return (
    <>
      <div>
        <TabTitle title={t('Presence.title')} loading={isLoading} />

        {presenceEvents.length === 0 && !isLoading && (
          <Empty
            icon={<CozyIcon />}
            title={t('Presence.emptyList.title')}
            description={t('Presence.emptyList.description')}
          />
        )}

        {presenceEvents.map(group => (
          <List key={group.month}>
            <ListSubheader>
              <Typography variant="subtitle2" color="textSecondary">
                {group.prettyMonth}
              </Typography>
            </ListSubheader>
            {group.events.map((event, j) => (
              <PresenceItem key={event._id} event={event} j={j} group={group} />
            ))}
          </List>
        ))}
      </div>
    </>
  )
}
