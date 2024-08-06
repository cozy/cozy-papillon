import cx from 'classnames'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BarComponent, BarCenter } from 'cozy-bar'
import { useClient } from 'cozy-client'
import CalendarIcon from 'cozy-ui/transpiled/react/Icons/Calendar'
import CheckboxIcon from 'cozy-ui/transpiled/react/Icons/Checkbox'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import WalkIcon from 'cozy-ui/transpiled/react/Icons/Walk'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import Nav, {
  NavItem,
  NavIcon,
  NavText,
  genNavLink
} from 'cozy-ui/transpiled/react/Nav'
import Sidebar from 'cozy-ui/transpiled/react/Sidebar'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ExampleRouterNavLink = ({
  children,
  className,
  active,
  activeClassName,
  onClick
}) => (
  <a
    onClick={onClick}
    className={cx(className, active ? activeClassName : null)}
  >
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

  const makeProps = route => {
    const routeIsMatching = currentTab === route[0]
    return {
      onClick: () => {
        navigate('/' + route.join('/'))
      },
      active: routeIsMatching
    }
  }

  return (
    <Layout>
      <Sidebar>
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
