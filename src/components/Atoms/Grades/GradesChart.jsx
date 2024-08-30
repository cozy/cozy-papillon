import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { getSubjectName } from 'src/format/subjectName'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const truncateLabel = (label, maxLength) => {
  if (label.length > maxLength) {
    return label.substring(0, maxLength) + '...'
  }
  return label
}

const GradesChart = ({ subjects }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primaryColor')
  const primaryColorLightest = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primaryColorLightest')
  const maxColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--successColorLight'
  )
  const minColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--errorColorLight'
  )

  const data = {
    labels: subjects.map(subject =>
      truncateLabel(getSubjectName(subject.subject).pretty, 10)
    ),
    datasets: [
      {
        label: t('Grades.values.class.title'),
        data: subjects.map(subject => subject.aggregation?.avgClass ?? 0),
        backgroundColor: primaryColorLightest,
        borderRadius: 5
      },
      {
        label: t('Grades.values.student.title'),
        data: subjects.map(subject => subject.aggregation?.avgGrades ?? 0),
        backgroundColor: primaryColor,
        borderRadius: 5
      },
      {
        label: t('Grades.values.max.title'),
        data: subjects.map(subject => subject.aggregation?.maxClass ?? 0),
        backgroundColor: maxColor + '60',
        borderRadius: 5,
        hidden: true
      },
      {
        label: t('Grades.values.min.title'),
        data: subjects.map(subject => subject.aggregation?.minClass ?? 0),
        backgroundColor: minColor + '60',
        borderRadius: 5,
        hidden: true
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: 'Lato',
            weight: '500'
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          drawBorder: false // Masquer la bordure verticale gauche
        }
      }
    }
  }

  return (
    <div
      style={{
        padding: '16px'
      }}
    >
      <Bar height={isMobile ? 150 : 70} data={data} options={options} />
    </div>
  )
}

export default GradesChart
