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

export const GradeModal = ({ grade, closeModalAction }) => {
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