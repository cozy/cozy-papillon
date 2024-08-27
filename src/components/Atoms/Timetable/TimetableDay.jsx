import React from 'react'

import List from 'cozy-ui/transpiled/react/List'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { TimetableItem } from './TimetableItem'
import { TimetableSeparator } from './TimetableSeparator'

export const TimetableDay = ({ day, timetable }) => {
  const { t } = useI18n()

  const courses =
    (
      timetable.find(group => group.date === day.toISOString()) ?? {
        courses: []
      }
    )?.courses ?? []

  return (
    <div
      key={day.toISOString()}
      style={{
        overflowX: 'hidden'
      }}
      className="u-flex u-flex-column u-w-100 u-h-100"
    >
      <List>
        <ListSubheader>
          {day.toLocaleDateString('default', {
            weekday: 'long',
            day: '2-digit'
          })}
        </ListSubheader>

        {courses.map((course, i) => (
          <>
            <TimetableItem course={course} key={course._id} />

            {courses[i + 1] &&
              new Date(course.end).getTime() + 3600000 <
                new Date(courses[i + 1].start).getTime() && (
                <TimetableSeparator
                  end={new Date(course.end)}
                  start={new Date(courses[i + 1].start)}
                />
              )}
          </>
        ))}

        {(
          timetable.find(group => group.date === day.toISOString()) ?? {
            courses: []
          }
        )?.courses.length === 0 && (
          <div className="u-flex u-flex-column u-flex-justify-center u-flex-items-center u-p-1 u-w-100">
            <Typography variant="body2" color="textSecondary">
              {t('Timetable.noCourses')}
            </Typography>
          </div>
        )}
      </List>
    </div>
  )
}
