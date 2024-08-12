import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectName } from 'src/format/subjectName'
import { buildGradeItemQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import MuiBreadcrumbs from 'cozy-ui/transpiled/react/Breadcrumbs'
import {
  DialogBackButton,
  DialogCloseButton,
  useCozyDialog
} from 'cozy-ui/transpiled/react/CozyDialogs'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CalendarIcon from 'cozy-ui/transpiled/react/Icons/Calendar'
import CreditIcon from 'cozy-ui/transpiled/react/Icons/Credit'
import DebitIcon from 'cozy-ui/transpiled/react/Icons/Debit'
import PercentIcon from 'cozy-ui/transpiled/react/Icons/Percent'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const GradeModal = () => {
  const { t } = useI18n()
  const { subjectId, gradeId } = useParams()
  const navigate = useNavigate()

  console.log('subjectId', subjectId)
  console.log('gradeId', gradeId)

  const gradeItemQuery = buildGradeItemQuery(subjectId)
  const { data: subject, fetchStatus } = useQuery(
    gradeItemQuery.definition,
    gradeItemQuery.options
  )

  const grade = subject && subject.series.find(grade => grade.id === gradeId)

  if (!grade) {
    return <div />
  }

  const valuesList = [
    {
      primary: t('Grades.values.student.title'),
      secondary: t('Grades.values.student.description'),
      value: `${parseFloat(grade.value.student).toFixed(2)}`,
      icon: PieChartIcon,
      important: true
    },
    {
      primary: t('Grades.values.class.title'),
      secondary: t('Grades.values.class.description'),
      value: `${parseFloat(grade.value.classAverage).toFixed(2)}`,
      icon: TeamIcon
    },
    grade.value.classMax >= 0 && {
      primary: t('Grades.values.max.title'),
      secondary: t('Grades.values.max.description'),
      value: `${parseFloat(grade.value.classMax).toFixed(2)}`,
      icon: CreditIcon
    },
    grade.value.classMin >= 0 && {
      primary: t('Grades.values.min.title'),
      secondary: t('Grades.values.min.description'),
      value: `${parseFloat(grade.value.classMin).toFixed(2)}`,
      icon: DebitIcon
    }
  ]

  return (
    <Dialog
      open
      onClose={() =>
        navigate('..', {
          replace: true
        })
      }
      disableGutters
      title={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <MuiBreadcrumbs>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography
                variant="h5"
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid var(--secondaryColorLightest)'
                }}
              >
                {getSubjectName(subject.subject).emoji || '📚'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {getSubjectName(subject.subject).pretty || 'Aucune matière'}
              </Typography>
            </div>
            <Typography variant="subtitle1" color="textPrimary">
              {grade.label || 'Note sans titre'}
            </Typography>
          </MuiBreadcrumbs>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="h2" color="textPrimary">
              {parseFloat(grade.value.student).toFixed(2)}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginBottom: '2px' }}
            >
              /{grade.value.outOf}
            </Typography>
          </div>
        </div>
      }
      content={
        <div>
          <List
            subheader={
              <ListSubheader>{t('Grades.dialogContext')}</ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <Icon icon={CalendarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={t('Grades.date')}
                secondary={new Date(grade.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
            </ListItem>
            <Divider component="li" variant="inset" />
            <ListItem>
              <ListItemIcon>
                <Icon icon={PercentIcon} />
              </ListItemIcon>
              <ListItemText
                primary={t('Grades.values.coefficient.title')}
                secondary={t('Grades.values.coefficient.description')}
              />

              <div
                className="cozy-grade-chip"
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <Typography variant="body2" color="textSecondary">
                  x
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{ fontWeight: 'bold' }}
                >
                  {parseFloat(grade.value.coef).toFixed(2)}
                </Typography>
              </div>
            </ListItem>
          </List>

          <List
            subheader={<ListSubheader>{t('Grades.valuesList')}</ListSubheader>}
          >
            {valuesList.map(
              (value, i) =>
                value && (
                  <div key={i}>
                    <ListItem>
                      <ListItemIcon>
                        <Icon icon={value.icon} />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: value.important ? 'bold' : 'normal'
                            }}
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
                          style={{
                            fontWeight: value.important ? 'bold' : 'normal'
                          }}
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
                )
            )}
          </List>
        </div>
      }
    />
  )
}
