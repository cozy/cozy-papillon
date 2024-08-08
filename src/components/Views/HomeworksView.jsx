import cx from 'classnames'
import React, { useState } from 'react'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import {
  getAllHomeworks,
  getAllPresence,
  buildHomeworkQuery
} from 'src/queries'

import { BarCenter } from 'cozy-bar'
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
import LoadMore from 'cozy-ui/transpiled/react/LoadMore'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import ListSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListSkeleton'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const makeStyle = isMobile => ({
  header: {
    display: 'flex',
    padding: '1.5rem 2rem',
    justifyContent: 'space-between'
  },
  titlebar: {
    maxwidth: '100%',
    flex: 2
  }
})

export const HomeworksView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const homeworksQuery = buildHomeworkQuery()
  const {
    data: homeworks,
    fetchStatus,
    hasMore,
    fetchMore
  } = useQuery(homeworksQuery.definition, homeworksQuery.options)

  const isLoading = fetchStatus == 'loading'

  const newHws = (homeworks ?? []).reduce((acc, hw) => {
    // convert YYYYMMDDT000000Z to YYYY-MM-DDT00:00:00Z
    const nDate = hw.dueDate.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
      '$1-$2-$3T$4:$5:$6Z'
    )

    const date = new Date(nDate)
    const day = date.toISOString()
    if (acc.find(group => group.date === day)) {
      return acc.map(group => {
        if (group.date === day) {
          return {
            ...group,
            hws: [...group.hws, hw]
          }
        }
        return group
      })
    }

    return [
      ...acc,
      {
        date: date.toISOString(),
        hws: [hw]
      }
    ]
  }, [])

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        className={cx('u-flex', isMobile ? 'test' : 'tets')}
      >
        {!isMobile ? (
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
                {t('Homeworks.title')}
              </Typography>
            </Paper>

            <Divider />
          </>
        ) : (
          <BarCenter>
            <Typography variant="h5">{t('Homeworks.title')}</Typography>
          </BarCenter>
        )}

        {isLoading && <LinearProgress />}

        {newHws.length === 0 && !isLoading && (
          <Empty
            icon={CozyIcon}
            title={t('Homeworks.emptyList.title')}
            description={t('Homeworks.emptyList.description')}
          />
        )}

        <div
          style={{
            height: '100%',
            overflow: 'auto',
            overflowY: 'scroll'
          }}
        >
          {newHws.map((day, i) => (
            <List key={i} className={day.current ? 'current' : ''}>
              <ListSubheader>
                <Typography variant="subtitle2" color="textSecondary">
                  {new Date(day.date).toLocaleDateString('default', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Typography>
              </ListSubheader>

              {day.hws.map((hw, j) => (
                <div key={j}>
                  <ListItem>
                    <ListItemIcon>
                      <Typography variant="h3" color="textPrimary">
                        {getSubjectName(hw.subject).emoji || '📚'}
                      </Typography>
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: subjectColor(hw.subject)
                            }}
                          />
                          <Typography variant="subtitle2" color="textSecondary">
                            {getSubjectName(hw.subject).pretty}
                          </Typography>
                        </div>
                      }
                      secondary={
                        <Typography variant="body1" color="textPrimary" noWrap>
                          {hw.summary}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {j < day.hws.length - 1 && (
                    <Divider component="li" variant="inset" />
                  )}
                </div>
              ))}
            </List>
          ))}

          {hasMore && (
            <LoadMore label={t('Homeworks.loadMore')} fetchMore={fetchMore} />
          )}
        </div>
      </div>
    </>
  )
}
