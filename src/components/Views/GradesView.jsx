import React, { useEffect, useState } from 'react'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { buildGradesQuery } from 'src/queries'

import { BarRight, BarCenter } from 'cozy-bar'
import { useQuery } from 'cozy-client'
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

const makeStyle = () => ({
  cozyGradeChip: {
    display: 'flex',
    alignItems: 'flex-end'
  }
})

export const GradesView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const gradesQuery = buildGradesQuery()
  const { data: subjects, fetchStatus } = useQuery(
    gradesQuery.definition,
    gradesQuery.options
  )

  const isLoading = fetchStatus == 'loading'

  const allPeriods = [
    ...new Set(
      (subjects ?? []).map(subject => ({
        title: subject.title,
        year: new Date(subject.startDate).getFullYear()
      }))
    )
  ]

  const periods = [...new Set((allPeriods ?? []).map(period => period.title))]
  const years = [...new Set((allPeriods ?? []).map(period => period.year))]

  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  // Update year when period changes
  const updateYear = (period, year) => {
    const existsInYear = allPeriods.some(
      p => p.title === period && p.year === year
    )

    if (!existsInYear) {
      const availableYear = allPeriods.find(p => p.title === period)?.year
      if (availableYear) {
        setSelectedYear(availableYear)
      }
    }
  }

  useEffect(() => {
    if (selectedPeriod && selectedYear) {
      updateYear(selectedPeriod, selectedYear)
    }
  }, [selectedPeriod, selectedYear])

  if (selectedPeriod === '' && periods.length > 0) {
    setSelectedPeriod(periods[0])
  }

  if (selectedYear === '' && years.length > 0) {
    setSelectedYear(years[0])
  }

  const [openedGrade, setOpenedGrade] = useState(null)
  const [openedGradeSubject, setOpenedGradeSubject] = useState(null)

  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [yearMenuOpen, setYearMenuOpen] = useState(false)

  const periodDropdownRef = React.useRef(null)
  const yearDropdownRef = React.useRef(null)
  const mobilePeriodDropdownRef = React.useRef(null)
  const mobileYearDropdownRef = React.useRef(null)

  const periodSelectorProps = {
    periodDropdownRef,
    yearDropdownRef,
    selectedPeriod,
    setSelectedPeriod,
    selectedYear,
    setSelectedYear,
    setPeriodMenuOpen,
    periodMenuOpen,
    setYearMenuOpen,
    yearMenuOpen,
    allPeriods: allPeriods,
    periods,
    years,
    t
  }

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

      {isMobile && (
        <>
          <BarCenter>
            <PeriodSelectorButton
              textVariant="h5"
              {...periodSelectorProps}
              periodDropdownRef={mobilePeriodDropdownRef}
              yearDropdownRef={mobileYearDropdownRef}
            />
          </BarCenter>
          <BarRight>
            <YearSelectorButton
              {...periodSelectorProps}
              yearDropdownRef={mobileYearDropdownRef}
            />
          </BarRight>
        </>
      )}

      <div>
        {!isMobile && (
          <>
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

              <PeriodSelector {...periodSelectorProps} />
            </Paper>

            <Divider />
          </>
        )}

        {isLoading && <LinearProgress />}

        {(subjects ?? []).length === 0 && !isLoading && (
          <Empty
            icon={CozyIcon}
            title={t('Grades.emptyList.title')}
            text={t('Grades.emptyList.description')}
            centered
          />
        )}

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
          .filter(subject => {
            return subject.title === selectedPeriod
          })
          .filter(subject => {
            return (
              new Date(subject.startDate).getFullYear() ===
              parseInt(selectedYear)
            )
          })
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

const PeriodSelector = ({
  periodDropdownRef,
  yearDropdownRef,
  selectedPeriod,
  setSelectedPeriod,
  selectedYear,
  setSelectedYear,
  setPeriodMenuOpen,
  periodMenuOpen,
  setYearMenuOpen,
  yearMenuOpen,
  allPeriods,
  periods,
  years,
  t
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <PeriodSelectorButton
        periodDropdownRef={periodDropdownRef}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        setPeriodMenuOpen={setPeriodMenuOpen}
        periodMenuOpen={periodMenuOpen}
        periods={periods}
        t={t}
      />

      <YearSelectorButton
        yearDropdownRef={yearDropdownRef}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        setYearMenuOpen={setYearMenuOpen}
        yearMenuOpen={yearMenuOpen}
        allPeriods={allPeriods}
        selectedPeriod={selectedPeriod}
        years={years}
        t={t}
      />
    </div>
  )
}

const PeriodSelectorButton = ({
  periodDropdownRef,
  selectedPeriod,
  setSelectedPeriod,
  setPeriodMenuOpen,
  periodMenuOpen,
  periods,
  t,
  textVariant
}) => {
  return (
    <>
      <DropdownButton
        ref={periodDropdownRef}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => setPeriodMenuOpen(!periodMenuOpen)}
        textVariant={textVariant}
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
        {periods.map((period, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectedPeriod(period)
              setPeriodMenuOpen(false)
            }}
            selected={period === selectedPeriod}
          >
            <ListItemText primary={period} />
          </MenuItem>
        ))}

        {periods.length === 0 && (
          <MenuItem disabled>
            <ListItemText primary={t('Grades.emptyList.periods')} />
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

const YearSelectorButton = ({
  yearDropdownRef,
  selectedYear,
  selectedPeriod,
  setSelectedYear,
  setYearMenuOpen,
  yearMenuOpen,
  allPeriods,
  years,
  t
}) => {
  return (
    <>
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
        {[
          ...new Set(
            allPeriods.filter(p => p.title === selectedPeriod).map(p => p.year)
          )
        ].map((year, i) => (
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
    </>
  )
}
