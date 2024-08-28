import React from 'react'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'

import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

export const GradesSubjectSubheader = ({ subject }) => {
  const { isMobile } = useBreakpoints()

  return (
    <ListSubheader style={{ borderRadius: isMobile ? 0 : 8 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flex: 1,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: subjectColor(subject.subject),
              borderRadius: '50px'
            }}
          />

          <Typography variant="subtitle1" color="textSecondary" noWrap>
            {getSubjectName(subject.subject).pretty || ''}
          </Typography>

          <Typography variant="caption" color="textSecondary" noWrap>
            {getSubjectName(subject.subject).speciality || ''}
          </Typography>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: 'bold' }}
          >
            {parseFloat(subject.aggregation.avgGrades).toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginBottom: 0.5 }}
          >
            /20
          </Typography>
        </div>
      </div>
    </ListSubheader>
  )
}
