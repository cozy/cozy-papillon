import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React, { useEffect, useMemo } from 'react'
import { Line } from 'react-chartjs-2';
import { getSubjectName } from 'src/format/subjectName'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { GetAverage } from 'src/format/getAverage'
import Typography from 'cozy-ui/transpiled/react/Typography';

import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import List from 'cozy-ui/transpiled/react/List'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Divider from 'cozy-ui/transpiled/react/Divider'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const truncateLabel = (label, maxLength) => {
  if (label.length > maxLength) {
    return label.substring(0, maxLength) + '...'
  }
  return label
}

const GradesChart = ({ subjects }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const [currentSubject, setCurrentSubject] = React.useState(null)

  try {
  const allGrades = useMemo(() => {
    if (currentSubject) {
      const subject = subjects.find(s => s.subject === currentSubject)
      return subject ? subject.series : []
    }

    return subjects.flatMap(subject => subject.series)
  }, [subjects, currentSubject])

  const avgHistory = useMemo(() => {
    // calculate average by removing each grade one by one
    const history = allGrades.map((_, index) => {
      const gradesCopy = [...allGrades]
      // remove all grades after index
      gradesCopy.splice(index + 1)
      return {
        student: GetAverage(gradesCopy, 'student'),
        class: GetAverage(gradesCopy, 'classAverage')
      }
    })
    console.log('Avg history:', history)
    return history
  }, [allGrades, currentSubject])

  const avgDateHistory = useMemo(() => {
    const history = allGrades.map((grade) => new Date(grade.date))
    return history
  }, [allGrades])

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
  const hintTextColor = getComputedStyle(document.documentElement).getPropertyValue('--hintTextColor').trim();

  const data = useMemo(() => {
    const labels = avgDateHistory.map(date => {
      const options = { month: 'short', day: '2-digit' }
      return date.toLocaleDateString(undefined, options)
    })
    const datasets = [
      {
        label: 'Ma moyenne',
        data: avgHistory.map(avg => Math.round(parseFloat(avg.student) * 100) / 100),
        borderColor: primaryColor,
        pointBackgroundColor: primaryColor,
        borderWidth: 4,
        tension: 0.5,
        fill: true,
        backgroundColor: primaryColor + '33', // 20% opacity
      },
      {
        label: 'Moyenne de la classe',
        data: avgHistory.map(avg => Math.round(parseFloat(avg.class) * 100) / 100),
        borderColor: hintTextColor,
        borderWidth: 2,
        tension: 0.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      } 
    ]

    return {
      labels: labels,
      datasets: datasets
    }
  }, [subjects, avgHistory, isMobile])

  console.log('Chart data:', data)

  const allSubjects = useMemo(() => {
    return subjects.map(subject => subject.subject)
  }, [subjects])

  useEffect(() => {
    if(allGrades.indexOf(currentSubject) === -1) {
      setCurrentSubject(null)
    }
  }, [subjects])

  const [menuOpen, setMenuOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const ref = React.useRef(null)

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  return (
    <div
      style={{
        padding: '8px',
        margin: '16px',
        marginTop: '0px',
        backgroundColor: 'var(--defaultBackgroundColor)',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'center' : 'flex-start',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: '2px',
          marginTop: '8px',
          marginBottom: '8px',
          marginLeft: isMobile ? '0px' : '8px',
        }}
      >
        <DropdownButton
          ref={ref}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={toggleMenu}
          variant={isMobile ? "subtitle1" : "body1"}
          color='textSecondary'
        >
          {currentSubject ? getSubjectName(currentSubject).pretty : t('Grades.gradeAverage')}
        </DropdownButton>

        <Menu
          open={menuOpen}
          anchorEl={anchorEl}
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
          onClose={closeMenu}
        >
          <MenuItem selected={currentSubject === null} onClick={() => {
            setCurrentSubject(null)
            closeMenu()
          }}>
            <ListItemText primary={t('Grades.gradeAverage')} />
          </MenuItem>
          <Divider className="u-mv-half" />
          {allSubjects.map((subject, index) => (
            <MenuItem
              key={index}
              selected={currentSubject === subject}
              onClick={() => {
                setCurrentSubject(subject)
                closeMenu()
              }}
            >
              <ListItemIcon>
                <Typography variant='h4'>
                  {getSubjectName(subject).emoji}
                </Typography>
              </ListItemIcon>
              <ListItemText primary={truncateLabel(getSubjectName(subject).pretty, 20)} />
            </MenuItem>
          ))}
        </Menu>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0px',
          }}
        >
          <Typography variant={isMobile ? "h3" : "h2"} color='textPrimary'>
            {avgHistory.length > 0 && avgHistory[avgHistory.length - 1].student.toFixed(2)}
          </Typography>
          <Typography variant={isMobile ? "h5" : "h4"} color='textSecondary'>
            /20
          </Typography>
        </div>
      </div>

      <div>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                padding: 10,
                cornerRadius: 8,
                boxPadding: 6,
                titleFont: {
                  family: 'Inter',
                },
                bodyFont: {
                  family: 'Inter',
                },
                callbacks: {
                  title: function(context) {
                    let x = context[0].parsed.x;
                    return avgDateHistory[x].toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                  },
                  label: function(context) {
                    let title = context.dataset.label;
                    return title;
                  },
                  afterLabel: function (context) {
                    let label = context.parsed.y;
                    return label.toFixed(2).trim() + "/20";
                  },
                }
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
          }}
          height={200}
        />
      </div>
    </div>
  )
  } catch (error) {
    console.error('Error rendering GradesChart:', error)
    return null
  } 
}

export default GradesChart
