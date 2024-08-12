import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'
import { buildHomeworkItemQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const HomeworkModal = () => {
  const { homeworkId } = useParams()
  const navigate = useNavigate()

  const timetableItemQuery = buildHomeworkItemQuery(homeworkId)
  const { data: homework, fetchStatus } = useQuery(
    timetableItemQuery.definition,
    timetableItemQuery.options
  )

  if (!homework) {
    return <div />
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
