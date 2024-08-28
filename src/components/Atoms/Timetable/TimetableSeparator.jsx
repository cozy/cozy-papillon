import React from 'react'
import { useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { timeDist } from 'src/format/timeDist'

import Icon from 'cozy-ui/transpiled/react/Icon'
import MountainIcon from 'cozy-ui/transpiled/react/Icons/Mountain'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
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
