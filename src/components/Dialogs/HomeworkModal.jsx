import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'
import { buildHomeworkItemQuery, buildTimetableItemQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Divider from 'cozy-ui/transpiled/react/Divider'
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
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const HomeworkModal = () => {
  const { homeworkId } = useParams()
  const navigate = useNavigate()

  const timetableItemQuery = buildHomeworkItemQuery(homeworkId)
  const { data: homework, fetchStatus } = useQuery(
    timetableItemQuery.definition,
    timetableItemQuery.options
  )

  if (!homework) {
    return <div/>
  }

  // convert YYYYMMDDT000000Z to YYYY-MM-DDT00:00:00Z
  const newDueDate =
    homework?.dueDate &&
    homework?.dueDate?.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
      '$1-$2-$3T$4:$5:$6Z'
    )

  return (
    <Dialog
      open
      onClose={() =>
        navigate('..', {
          replace: true
        })
      }
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Typography variant="h3">
            {homework?.subject && getSubjectName(homework.subject).emoji}
          </Typography>
          <div>
            <Typography variant="h6">
              {homework?.subject && getSubjectName(homework.subject).pretty}
            </Typography>
            {homework?.dueDate && newDueDate && (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(newDueDate).toLocaleDateString('default', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            )}
          </div>
        </div>
      }
      content={homework?.summary}
    />
  )
}
