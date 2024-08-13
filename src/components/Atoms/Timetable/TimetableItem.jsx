import React from 'react'
import { useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'

import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { SubjectColor } from './SubjectColor'

export const TimetableItem = ({ course }) => {
  const navigate = useNavigate()

  return (
    <ListItem
      key={course._id}
      button
      onClick={() => {
        navigate(`/timetable/course/${course._id}`)
      }}
    >
      <SubjectColor color={subjectColor(course.subject)} />

      <ListItemText
        primary={
          <>
            <Typography variant="subtitle2" color="textSecondary" noWrap>
              {new Date(course.start).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}{' '}
            </Typography>
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
