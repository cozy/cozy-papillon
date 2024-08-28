import React from 'react'
import { useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'

import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import Divider from 'cozy-ui/transpiled/react/Divider'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const HomeworkItem = ({ hw, j, day }) => {
  const navigate = useNavigate()

  return (
    <div key={j}>
      <ListItem
        button
        onClick={() => {
          navigate(`homework/${hw._id}`)
        }}
        style={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <Checkbox checked={hw.completed} disabled />

          {/*
          <Typography variant="h3" color="textPrimary">
            {getSubjectName(hw.subject).emoji || '📚'}
          </Typography>
          */}
        </ListItemIcon>

        <ListItemText
          primary={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: subjectColor(hw.subject)
                }}
              />
              <Typography variant="subtitle2" color="textSecondary">
                {getSubjectName(hw.subject).pretty}
              </Typography>
            </div>
          }
          secondary={
            <Typography variant="body1" color="textPrimary" noWrap>
              {hw.summary}
            </Typography>
          }
        />
      </ListItem>

      {j < day.hws.length - 1 && <Divider component="li" variant="inset" />}
    </div>
  )
}
