import React, { useEffect, useState } from 'react'
import { getSubjectName } from 'src/format/subjectName'
import { getAllGrades } from 'src/queries'

import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import ListSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListSkeleton'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const makeStyle = isMobile => ({
  cozyGradeChip: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
    borderRadius: '1rem',
    border: '1px solid var(--secondaryColorLightest)'
  }
})

export const GradesView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllGrades().then(data => {
      console.log(data)
      setSubjects(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div>
        {loading && (
          <>
            {[...Array(4)].map((elementInArray, index) => (
              <ListSkeleton count={2 + index} hasSecondary withSubheader />
            ))}
          </>
        )}

        {subjects.map((subject, i) => (
          <List
            key={i}
            subheader={
              <ListSubheader>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    {getSubjectName(subject.subject)}
                  </Typography>

                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography variant="body1" color="textPrimary">
                      {parseFloat(subject.aggregation.avgGrades).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      /20
                    </Typography>
                  </div>
                </div>
              </ListSubheader>
            }
          >
            {subject.series.map((grade, j) => (
              <div key={grade.id}>
                <ListItem button>
                  <ListItemIcon>
                    <Icon icon={PieChartIcon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={grade.label || 'Note sans titre'}
                    secondary={new Date(grade.date).toLocaleDateString(
                      'fr-FR',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
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
            ))}
          </List>
        ))}
      </div>
    </>
  )
}
