import React from 'react'

import Chip from 'cozy-ui/transpiled/react/Chips'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BellIcon from 'cozy-ui/transpiled/react/Icons/Bell'
import ClockIcon from 'cozy-ui/transpiled/react/Icons/Clock'
import WalkIcon from 'cozy-ui/transpiled/react/Icons/Walk'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const PresenceItem = ({ event, j, group }) => {
  const { t } = useI18n()

  return (
    <div key={event._id}>
      <ListItem key={event._id}>
        <ListItemIcon>
          <Icon
            icon={
              event.xType == 'DELAY'
                ? ClockIcon
                : event.xType == 'ABSENCE'
                ? WalkIcon
                : BellIcon
            }
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <Typography variant="h6" noWrap>
                {event.xType == 'DELAY'
                  ? t('Presence.delay')
                  : event.xType == 'ABSENCE'
                  ? t('Presence.absence')
                  : t('Presence.presence')}
              </Typography>
              <Typography variant="body1" noWrap>
                {event.label}
              </Typography>
            </>
          }
          secondary={
            <Typography variant="body2" color="textSecondary" noWrap>
              {new Date(event.start).toLocaleString('default', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </Typography>
          }
        />

        <Chip
          label={
            event.xJustified
              ? t('Presence.justified')
              : event.label
              ? t('Presence.justifiedUnreceivable')
              : t('Presence.notJustified')
          }
          color={
            event.xJustified ? 'success' : event.label ? 'default' : 'error'
          }
          disabled={!event.xJustified && event.label}
        />
      </ListItem>
      {j !== group.events.length - 1 && (
        <Divider component="li" variant="inset" />
      )}
    </div>
  )
}
