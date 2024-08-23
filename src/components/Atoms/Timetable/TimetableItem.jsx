import React from 'react'
import { useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { timeDist } from 'src/format/timeDist'

import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { SubjectColor } from './SubjectColor'

export const TimetableItem = ({ course }) => {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <ListItem
      key={course._id}
      button
      onClick={() => {
        navigate(`/timetable/course/${course._id}`)
      }}
      disabled={course.status == 'CANCELLED'}
    >
      <SubjectColor color={subjectColor(course.subject)} />

      <ListItemText
        primary={
          <>
            {course.status !== 'CANCELLED' ? (
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle2" color="textPrimary" noWrap>
                  {new Date(course.start).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}{' '}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap
                  style={{ fontWeight: 400, fontSize: 12 }}
                >
                  | {timeDist(new Date(course.start), new Date(course.end))}
                </Typography>
              </div>
            ) : (
              <Typography variant="subtitle2" color="error" noWrap>
                {t('Timetable.cancelled')}
              </Typography>
            )}

            <Typography variant="h6" color="textPrimary" noWrap>
              {getSubjectName(course.subject).pretty}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography variant="body2" color="textSecondary" noWrap>
              {course.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {course.organizer}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}
