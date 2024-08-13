import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'
import { buildTimetableItemQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ClockIcon from 'cozy-ui/transpiled/react/Icons/Clock'
import ClockOutlineIcon from 'cozy-ui/transpiled/react/Icons/ClockOutline'
import InfoIcon from 'cozy-ui/transpiled/react/Icons/Info'
import LocationIcon from 'cozy-ui/transpiled/react/Icons/Location'
import PeopleIcon from 'cozy-ui/transpiled/react/Icons/People'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { SubjectTitle } from '../Atoms/SubjectTitle'

export const TimetableModal = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const timetableItemQuery = buildTimetableItemQuery(courseId)
  const { data: course } = useQuery(
    timetableItemQuery.definition,
    timetableItemQuery.options
  )

  const { t } = useI18n()

  const Time = course
    ? [
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
    : []

  const Informations = course
    ? [
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
    : []

  return (
    <Dialog
      open
      disableGutters
      onClose={() =>
        navigate('..', {
          replace: true
        })
      }
      title={<SubjectTitle subject={course?.subject} date={course?.start} />}
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
