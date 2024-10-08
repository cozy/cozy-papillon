import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { buildGradesQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import List from 'cozy-ui/transpiled/react/List'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { GradeItem } from '../Atoms/Grades/GradeItem'
import GradesChart from '../Atoms/Grades/GradesChart'
import { GradesSubjectSubheader } from '../Atoms/Grades/GradesSubjectSubheader'
import { PeriodSelector } from '../Atoms/Grades/PeriodSelector'
import { TabTitle } from '../Atoms/TabTitle'
import { useAccountContext } from '../Provider/AccountProvider'

export const GradesView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const { currentAccount } = useAccountContext()

  const gradesQuery = buildGradesQuery(
    currentAccount?.cozyMetadata?.sourceAccountIdentifier
  )
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

  // if "Hors période" is present, make it last
  allPeriods.sort((a, b) => {
    if (a.title === 'Hors période') {
      return 1
    }
    if (b.title === 'Hors période') {
      return -1
    }
    return 0
  })

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

  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [yearMenuOpen, setYearMenuOpen] = useState(false)

  const periodDropdownRef = React.useRef(null)
  const yearDropdownRef = React.useRef(null)

  useEffect(() => {
    // if current period does not exist in the list of periods, set it to the first period
    if (!periods.includes(selectedPeriod)) {
      setSelectedPeriod(periods[0])
    }
  }, [subjects])

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
      <Outlet />

      <TabTitle title={t('Grades.title')} loading={isLoading}>
        <PeriodSelector {...periodSelectorProps} />
      </TabTitle>

      {(subjects ?? []).length > 0 && !isLoading && (
        <GradesChart
          subjects={
            subjects
              ? subjects.filter(subject => subject.title === selectedPeriod)
              : []
          }
        />
      )}

      {(subjects ?? []).length === 0 && !isLoading && (
        <Empty
          icon={CozyIcon}
          title={t('Grades.emptyList.title')}
          text={t('Grades.emptyList.description')}
          centered
        />
      )}

      {(subjects ?? [])
        .filter(subject => {
          return subject.title === selectedPeriod
        })
        .filter(subject => {
          return (
            new Date(subject.startDate).getFullYear() === parseInt(selectedYear)
          )
        })
        .map((subject, i) => (
          <List
            key={i}
            subheader={
              isMobile ? (
                <GradesSubjectSubheader subject={subject} />
              ) : (
                <div>
                  <GradesSubjectSubheader subject={subject} />
                </div>
              )
            }
            style={{
              marginLeft: isMobile ? '0px' : '16px',
              marginRight: isMobile ? '0px' : '16px'
            }}
          >
            {subject.series.map((grade, j) => (
              <GradeItem key={j} grade={grade} j={j} subject={subject} />
            ))}

            {subject.series.length == 0 && (
              <Empty
                icon={CozyIcon}
                title={t('Grades.emptyList.title')}
                text={t('Grades.emptyList.description')}
                centered
              />
            )}
          </List>
        ))}
    </>
  )
}
