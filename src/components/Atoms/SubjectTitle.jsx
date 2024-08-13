import React from 'react'
import { getSubjectName } from 'src/format/subjectName'

import Typography from 'cozy-ui/transpiled/react/Typography'

export const SubjectTitle = ({ subject, date }) => {
  return (
    <div style={{ gap: 16 }} className="u-flex u-flex-items-center">
      <Typography variant="h3">
        {subject && (getSubjectName(subject).emoji || '📚')}
      </Typography>
      <div>
        <Typography variant="h6">
          {subject && getSubjectName(subject).pretty}
        </Typography>
        {date && (
          <Typography variant="subtitle2" color="textSecondary">
            {new Date(date).toLocaleDateString('default', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        )}
      </div>
    </div>
  )
}
