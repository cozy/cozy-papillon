import React from 'react'
import { timeDist } from 'src/format/timeDist'

import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { SubjectColor } from './SubjectColor'

export const TimetableSeparator = ({ end, start }) => {
  const { t } = useI18n()

  const dist = timeDist(end, start)
  const isMidday = end.getHours() > 11 && start.getHours() < 14

  return (
    <ListItem
      button
      style={{
        backgroundColor: 'var(--secondaryBackground)',
        height: 92,
        borderRadius: 8,
        marginLeft: 4,
        marginRight: 4,
        width: 'calc(100% - 8px)'
      }}
    >
      <SubjectColor
        color="var(--secondaryColor)"
        style={{ opacity: 0.3, marginLeft: -4 }}
      />

      <ListItemText
        primary={
          isMidday ? t('Timetable.pauseMidday') : t('Timetable.pauseNoCourses')
        }
        secondary={`${t('Timetable.during')} ${dist}`}
      />
    </ListItem>
  )
}
