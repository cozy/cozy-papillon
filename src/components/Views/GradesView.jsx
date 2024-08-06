import React, { useEffect, useState } from 'react'
import { getSubjectName } from 'src/format/subjectName'
import { getAllGrades } from 'src/queries'

import Button from 'cozy-ui/transpiled/react/Buttons'
import {
  DialogBackButton,
  DialogCloseButton,
  useCozyDialog
} from 'cozy-ui/transpiled/react/CozyDialogs'
import Dialog, {
  DialogTitle,
  DialogActions
} from 'cozy-ui/transpiled/react/Dialog'
import Divider from 'cozy-ui/transpiled/react/Divider'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import ListSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListSkeleton'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const makeStyle = () => ({
  cozyGradeChip: {
    display: 'flex',
    alignItems: 'flex-end'
  }
})

const GradeModal = ({ grade, closeModalAction }) => {
  const { isMobile } = useBreakpoints()
  const {
    dialogProps,
    dialogTitleProps,
    listItemProps,
    dividerProps,
    dialogActionsProps
  } = useCozyDialog({
    size: 'medium',
    classes: {
      paper: 'my-class'
    },
    open,
    onClose: closeModalAction,
    disableEnforceFocus: true
  })

  const { t } = useI18n()

  console.log(grade)

  const valuesList = [
    {
      primary: t('Grades.values.student.title'),
      secondary: t('Grades.values.student.description'),
      value: `${parseFloat(grade.value.student).toFixed(2)}`,
      important: true
    },
    {
      primary: t('Grades.values.class.title'),
      secondary: t('Grades.values.class.description'),
      value: `${parseFloat(grade.value.classAverage).toFixed(2)}`
    },
    {
      primary: t('Grades.values.max.title'),
      secondary: t('Grades.values.max.description'),
      value: `${parseFloat(grade.value.classMax).toFixed(2)}`
    },
    {
      primary: t('Grades.values.min.title'),
      secondary: t('Grades.values.min.description'),
      value: `${parseFloat(grade.value.classMin).toFixed(2)}`
    }
  ]

  return (
    <Dialog {...dialogProps}>
      <DialogCloseButton onClick={closeModalAction} />
      <DialogTitle {...dialogTitleProps}>
        {isMobile ? <DialogBackButton onClick={closeModalAction} /> : null}
        {grade.label || 'Note sans titre'}
      </DialogTitle>

      <Divider />

      <List
        subheader={<ListSubheader>{t('Grades.dialogContext')}</ListSubheader>}
      >
        <ListItem>
          <ListItemText
            primary={t('Grades.date')}
            secondary={new Date(grade.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          />
        </ListItem>
      </List>

      <List subheader={<ListSubheader>{t('Grades.valuesList')}</ListSubheader>}>
        {valuesList.map((value, i) => (
          <div key={i}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{ fontWeight: value.important ? 'bold' : 'normal' }}
                  >
                    {value.primary}
                  </Typography>
                }
                secondary={value.secondary}
              />

              <div
                className="cozy-grade-chip"
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{ fontWeight: value.important ? 'bold' : 'normal' }}
                >
                  {parseFloat(value.value).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  /{parseFloat(grade.value.outOf).toFixed(0)}
                </Typography>
              </div>
            </ListItem>
            {i !== valuesList.length - 1 && (
              <Divider component="li" variant="inset" />
            )}
          </div>
        ))}
      </List>
    </Dialog>
  )
}

export const GradesView = () => {
  // const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  const [periods, setPeriods] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('')

  const loadGrades = async () => {
    return getAllGrades()
      .then(data => {
        // get a list of each data.title names unique
        const periods = data.reduce((acc, current) => {
          if (!acc.includes(current.title)) {
            acc.push(current.title)
          }
          return acc
        }, [])
        setPeriods(periods)
        setSelectedPeriod(periods[0])

        return setSubjects(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadGrades()
  }, [])

  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const periodDropdownRef = React.useRef(null)

  const [openedGrade, setOpenedGrade] = useState(null)

  return (
    <>
      {openedGrade && (
        <GradeModal
          grade={openedGrade}
          closeModalAction={() => setOpenedGrade(null)}
        />
      )}

      <div>
        <Paper
          square
          style={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <DropdownButton
            ref={periodDropdownRef}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => setPeriodMenuOpen(!periodMenuOpen)}
          >
            {selectedPeriod || 'Sélectionner une période'}
          </DropdownButton>

          <Menu
            open={periodMenuOpen}
            anchorEl={periodDropdownRef.current}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            keepMounted
            onClose={() => setPeriodMenuOpen(false)}
          >
            {periods.map((period, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setSelectedPeriod(period)
                  setPeriodMenuOpen(false)
                }}
              >
                <ListItemText primary={period} />
              </MenuItem>
            ))}
          </Menu>
        </Paper>

        <Divider />

        {loading && <LinearProgress />}

        {loading && (
          <>
            {[...Array(4)].map((elementInArray, index) => (
              <ListSkeleton
                key={index}
                count={2 + index}
                hasSecondary
                withSubheader
              />
            ))}
          </>
        )}

        {subjects
          .filter(subject => subject.title === selectedPeriod)
          .map((subject, i) => (
            <List
              key={i}
              subheader={
                <ListSubheader>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      style={{
                        textWrap: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
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
                  <ListItem button onClick={() => setOpenedGrade(grade)}>
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
                    <div
                      className="cozy-grade-chip"
                      style={style.cozyGradeChip}
                    >
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
