import React, { useEffect, useMemo, useState } from 'react'
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
  const { data: timeseries, fetchStatus } = useQuery(
    gradesQuery.definition,
    gradesQuery.options
  )

  useEffect(() => {
    // console.log('GradesView timeseries', timeseries)
  }, [timeseries])

  const allPeriods = useMemo(() => {
    if(!timeseries || timeseries.length === 0) return []
    
    const data = timeseries.map(series => ({
      title: series.title,
      year: new Date(series.startDate).getFullYear()
    }))

    // Remove duplicates
    return data.filter(
      (period, index, self) =>
        index ===
        self.findIndex(
          p => p.title === period.title && p.year === period.year
        )
    )
  }, [timeseries])

  const periods = useMemo(() => {
    if (!allPeriods || allPeriods.length === 0) return []
    return allPeriods.map(period => period.title)
  }, [allPeriods])

  const years = useMemo(() => {
    if (!allPeriods || allPeriods.length === 0) return []
    return allPeriods.map(period => period.year)
  }, [allPeriods])

  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

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

    if (existsInYear) {
      setSelectedYear(year)
    }
  }

  useEffect(() => {
    if (selectedPeriod && selectedYear) {
      updateYear(selectedPeriod, selectedYear)
    }
  }, [selectedPeriod, selectedYear])


  if (selectedPeriod === '' && periods.length > 0) {
    if(periods.length == 0) setSelectedPeriod('');
    setSelectedPeriod(periods[0])
  }

  if (selectedYear === '' && years.length > 0) {
    if (years.length == 0) setSelectedYear('');
    setSelectedYear(years[0])
  }
  
  useEffect(() => {
    // if current period does not exist in the list of periods, set it to the first period
    if (!periods.includes(selectedPeriod)) {
      setSelectedPeriod(periods[0])
    }
  }, [subjects, updateYear])

  const subjects = useMemo(() => {
    return timeseries
      ? timeseries.filter(
          series =>
            series.title === selectedPeriod &&
            new Date(series.startDate).getFullYear() === selectedYear
        ).filter(series => series['series'] !== undefined)
      : []
  }, [timeseries]);

  const isLoading = fetchStatus === 'loading';

  const periodDropdownRef = React.useRef(null)
  const yearDropdownRef = React.useRef(null)
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [yearMenuOpen, setYearMenuOpen] = useState(false)

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

      {subjects.length > 0 && (
        <GradesChart
          subjects={subjects}
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

      {subjects.map((subject, i) => (
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
