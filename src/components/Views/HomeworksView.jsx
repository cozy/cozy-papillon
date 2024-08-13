import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { subjectColor } from 'src/format/subjectColor'
import { getSubjectName } from 'src/format/subjectName'
import { buildHomeworkQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import LoadMore from 'cozy-ui/transpiled/react/LoadMore'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { TabTitle } from '../Atoms/TabTitle'
import { HomeworkItem } from '../Atoms/Homeworks/HomeworkItem'

export const HomeworksView = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()

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
      <Outlet />

      <div>
        <TabTitle title={t('Homeworks.title')} loading={isLoading} />

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
                <HomeworkItem key={j} hw={hw} j={j} day={day} />
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
