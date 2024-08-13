import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'
import { buildHomeworkItemQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { SubjectTitle } from '../Atoms/SubjectTitle'

export const HomeworkModal = () => {
  const { homeworkId } = useParams()
  const navigate = useNavigate()

  const timetableItemQuery = buildHomeworkItemQuery(homeworkId)
  const { data: homework } = useQuery(
    timetableItemQuery.definition,
    timetableItemQuery.options
  )

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
      title={<SubjectTitle subject={homework?.subject} date={newDueDate} />}
      content={homework?.summary ?? ''}
    />
  )
}
