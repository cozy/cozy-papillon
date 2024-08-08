import React, { useEffect, useState } from 'react'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { buildGradesQuery, getAllGrades } from 'src/queries'

import Divider from 'cozy-ui/transpiled/react/Divider'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
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

import { GradeModal } from '../Dialogs/GradesModal'
import { useQuery } from 'cozy-client'

const makeStyle = () => ({
  cozyGradeChip: {
    display: 'flex',
    alignItems: 'flex-end'
  }
})

const removeDuplicate = (array, key = 'title') => {
  return array.filter(
    (item, index, self) => index === self.findIndex(t => t[key] === item[key])
  )
}

export const GradesView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const homeworksQuery = buildGradesQuery()
  const { data: subjects, fetchStatus } = useQuery(
    homeworksQuery.definition,
    homeworksQuery.options
  )

  const isLoading = fetchStatus == 'loading'

  const [periods, setPeriods] = useState(['Trimestre 1'])
  const [selectedPeriod, setSelectedPeriod] = useState('Trimestre 1')
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const periodDropdownRef = React.useRef(null)
  const [years, setYears] = useState(['2023'])
  const [selectedYear, setSelectedYear] = useState('2023')
  const [yearMenuOpen, setYearMenuOpen] = useState(false)
  const yearDropdownRef = React.useRef(null)
  const [openedGrade, setOpenedGrade] = useState(null)
  const [openedGradeSubject, setOpenedGradeSubject] = useState(null)

  return (
    <>
      {openedGrade && (
        <GradeModal
          grade={openedGrade}
          subject={openedGradeSubject}
          closeModalAction={() => {
            setOpenedGrade(null)
            setOpenedGradeSubject(null)
          }}
        />
      )}

      <div>
        <Paper
          square
          style={{
            padding: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4" color="textPrimary">
            {t('Grades.title')}
          </Typography>

          {!isLoading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <DropdownButton
                ref={periodDropdownRef}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => setPeriodMenuOpen(!periodMenuOpen)}
              >
                {selectedPeriod || t('Grades.selectPeriod')}
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
                {removeDuplicate(periods, 'title')
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((period, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        setSelectedPeriod(period)
                        setPeriodMenuOpen(false)
                      }}
                      selected={period.title === selectedPeriod}
                    >
                      <ListItemText primary={period.title} />
                    </MenuItem>
                  ))}

                {periods.length === 0 && (
                  <MenuItem disabled>
                    <ListItemText primary={t('Grades.emptyList.periods')} />
                  </MenuItem>
                )}
              </Menu>

              <DropdownButton
                ref={yearDropdownRef}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => setYearMenuOpen(!yearMenuOpen)}
              >
                {selectedYear || t('Grades.selectYear')}
              </DropdownButton>

              <Menu
                open={yearMenuOpen}
                anchorEl={yearDropdownRef.current}
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
                onClose={() => setYearMenuOpen(false)}
              >
                {years.map((year, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      setSelectedYear(year)
                      setYearMenuOpen(false)
                    }}
                    selected={year === selectedYear}
                  >
                    <ListItemText primary={year} />
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Paper>

        <Divider />

        {(subjects ?? []).length === 0 && !isLoading && (
          <Empty
            icon={CozyIcon}
            title={t('Grades.emptyList.title')}
            text={t('Grades.emptyList.description')}
            centered
          />
        )}

        {isLoading && <LinearProgress />}

        {isLoading && (
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

        {(subjects ?? [])
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

                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        noWrap
                      >
                        {getSubjectName(subject.subject).pretty || ''}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="textSecondary"
                        noWrap
                      >
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
                  <ListItem
                    button
                    onClick={() => {
                      setOpenedGrade(grade)
                      setOpenedGradeSubject(subject)
                    }}
                  >
                    <ListItemIcon>
                      <Typography variant="h3" color="textPrimary">
                        {getSubjectName(subject.subject).emoji || '📚'}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={grade.label || 'Note sans titre'}
                      secondary={new Date(grade.date).toLocaleDateString(
                        'default',
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
