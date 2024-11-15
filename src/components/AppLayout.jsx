import cx from 'classnames'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BarCenter, BarComponent } from 'cozy-bar'
import { useClient } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CalendarIcon from 'cozy-ui/transpiled/react/Icons/Calendar'
import CheckboxIcon from 'cozy-ui/transpiled/react/Icons/Checkbox'
import FolderIcon from 'cozy-ui/transpiled/react/Icons/Folder'
import OpenappIcon from 'cozy-ui/transpiled/react/Icons/Openapp'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import WalkIcon from 'cozy-ui/transpiled/react/Icons/Walk'
import { Content, Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import Nav, {
  NavIcon,
  NavItem,
  NavText,
  genNavLink
} from 'cozy-ui/transpiled/react/Nav'
import { CircularProgress } from 'cozy-ui/transpiled/react/Progress'
import Sidebar from 'cozy-ui/transpiled/react/Sidebar'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useAccountContext } from './Provider/AccountProvider'
import { EmptyDataView } from './Views/EmptyDataView'
import useCurrentAccountFolderLink from '../hooks/useCurrentAccountFolderLink'

const ExampleRouterNavLink = ({
  children,
  className,
  active,
  activeClassName,
  ...rest
}) => (
  <a className={cx(className, active ? activeClassName : null)} {...rest}>
    {children}
  </a>
)

const NavLink = genNavLink(ExampleRouterNavLink)

const AppLayout = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const client = useClient()
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.slice(1)
  const { accountsList, fetchStatus } = useAccountContext()
  const currentAccountFolderLink = useCurrentAccountFolderLink()

  const makeProps = route => {
    const routeIsMatching = currentTab.includes(route[0])
    return {
      onClick: () => {
        navigate('/' + route.join('/'))
      },
      active: routeIsMatching
    }
  }

  if (accountsList.length == 0) {
    return (
      <Layout>
        <BarComponent />
        <Main>
          <Content>
            {fetchStatus === 'loaded' ? (
              <EmptyDataView />
            ) : (
              <CircularProgress />
            )}
          </Content>
        </Main>
      </Layout>
    )
  }

  return (
    <Layout>
      <Sidebar style={isMobile ? { overflow: 'hidden' } : {}}>
        <Nav>
          <NavItem>
            <NavLink {...makeProps(['timetable'])}>
              <NavIcon icon={CalendarIcon} />
              <NavText>{t('Sidebar.timetable')}</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink {...makeProps(['homeworks'])}>
              <NavIcon icon={CheckboxIcon} />
              <NavText>{t('Sidebar.homeworks')}</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink {...makeProps(['grades'])}>
              <NavIcon icon={PieChartIcon} />
              <NavText>{t('Sidebar.grades')}</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink {...makeProps(['presence'])}>
              <NavIcon icon={WalkIcon} />
              <NavText>{t('Sidebar.presence')}</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={currentAccountFolderLink}
              target={isFlagshipApp() ? '_self' : '_blank'}
            >
              <NavIcon icon={FolderIcon} />
              <NavText>{t('Sidebar.documents')}</NavText>
              {!isMobile && (
                <Icon
                  icon={OpenappIcon}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 8
                  }}
                />
              )}
            </NavLink>
          </NavItem>
        </Nav>
      </Sidebar>
      <BarComponent />
      <Main>
        <Content>
          {isMobile && (
            <BarCenter>
              <Typography variant="h5">{client.appMetadata.slug}</Typography>
            </BarCenter>
          )}
          <Outlet />
        </Content>
      </Main>
      <Alerter t={t} />
    </Layout>
  )
}

export default AppLayout
