import React from 'react'
import { getSubjectName } from 'src/format/subjectName'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import InfoIcon from 'cozy-ui/transpiled/react/Icons/Info'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import ClockIcon from 'cozy-ui/transpiled/react/Icons/Clock'
import ClockOutlineIcon from 'cozy-ui/transpiled/react/Icons/ClockOutline'
import LocationIcon from 'cozy-ui/transpiled/react/Icons/Location'
import PeopleIcon from 'cozy-ui/transpiled/react/Icons/People'

export const TimetableModal = ({ course, closeModalAction }) => {
  const { isMobile } = useBreakpoints()

  const { t } = useI18n()

  const Time = [
    {
      title: t('Timetable.start'),
      subtitle: new Date(course.start).toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: ClockIcon
    },
    {
      title: t('Timetable.end'),
      subtitle: new Date(course.end).toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: ClockOutlineIcon
    }
  ]

  const Informations = [
    {
      title: t('Timetable.location'),
      subtitle: course.location ?? 'Non défini',
      icon: PeopleIcon
    },
    {
      title: t('Timetable.teacher'),
      subtitle: course.organizer ?? 'Non défini',
      icon: LocationIcon
    },
    {
      title: t('Timetable.status'),
      subtitle:
        (course.status ?? '') == 'CONFIRMED' ? 'Maintenu' : 'Non maintenu',
      icon: InfoIcon
    }
  ]

  return (
    <Dialog
      open
      onClose={() => closeModalAction()}
      disableGutters

      title={
          <div>
            <Typography variant="h5">
              {getSubjectName(course.subject).pretty}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {new Date(course.start).toLocaleDateString('default', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </div>
      }

      content={
        <div>
          <List>
            <ListSubheader>{t('Timetable.duration')}</ListSubheader>

            {Time.map((info, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {info.icon && <Icon icon={info.icon} />}
                </ListItemIcon>
                <ListItemText primary={info.title} secondary={info.subtitle} />
              </ListItem>
            ))}
          </List>

          <List>
            <ListSubheader>{t('Timetable.informations')}</ListSubheader>

            {Informations.map((info, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {info.icon && <Icon icon={info.icon} />}
                </ListItemIcon>
                <ListItemText primary={info.title} secondary={info.subtitle} />
              </ListItem>
            ))}
          </List>
        </div>
      }
    />
  )
}
