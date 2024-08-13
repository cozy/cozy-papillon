import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'

import Divider from 'cozy-ui/transpiled/react/Divider'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

const makeStyle = () => ({
  cozyGradeChip: {
    display: 'flex',
    alignItems: 'flex-end'
  }
})

export const GradeItem = ({ grade, j, subject }) => {
  const style = makeStyle()
  const navigate = useNavigate()

  return (
    <div key={grade.id}>
      <ListItem
        button
        onClick={() => {
          navigate(`/grades/grade/${subject._id}/${grade.id}`)
        }}
      >
        <ListItemIcon>
          <Typography variant="h3" color="textPrimary">
            {getSubjectName(subject.subject).emoji || '📚'}
          </Typography>
        </ListItemIcon>
        <ListItemText
          primary={grade.label || 'Note sans titre'}
          secondary={new Date(grade.date).toLocaleDateString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        />
        <div className="cozy-grade-chip" style={style.cozyGradeChip}>
          <Typography variant="body1" color="textPrimary">
            {parseFloat(grade.value.student).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            /{parseFloat(grade.value.outOf).toFixed(0)}
          </Typography>
        </div>
      </ListItem>
      {j !== subject.series.length - 1 && (
        <Divider component="li" variant="inset" />
      )}
    </div>
  )
}
