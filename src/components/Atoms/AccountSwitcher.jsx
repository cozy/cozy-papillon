import cx from 'classnames'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { buildAccountsQuery } from 'src/queries'

import { BarComponent, BarCenter } from 'cozy-bar'
import { useClient, useQuery } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Chip from 'cozy-ui/transpiled/react/Chips'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CalendarIcon from 'cozy-ui/transpiled/react/Icons/Calendar'
import CheckboxIcon from 'cozy-ui/transpiled/react/Icons/Checkbox'
import ExchangeIcon from 'cozy-ui/transpiled/react/Icons/Exchange'
import People from 'cozy-ui/transpiled/react/Icons/People'
import PieChartIcon from 'cozy-ui/transpiled/react/Icons/PieChart'
import WalkIcon from 'cozy-ui/transpiled/react/Icons/Walk'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import List from 'cozy-ui/transpiled/react/List'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import Menu from 'cozy-ui/transpiled/react/Menu'
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
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { AccountContext } from '../AppLayout'

export const AccountSwitcher = () => {
  const { currentAccount, setCurrentAccount } = useContext(AccountContext)

  const accountsQuery = buildAccountsQuery()

  const { data: accounts, fetchStatus } = useQuery(
    accountsQuery.definition,
    accountsQuery.options
  )

  const accountsList = accounts ? accounts : []
  const [accountMenuShown, setAccountMenuShown] = useState(false)

  useEffect(() => {
    if (accountsList.length > 0 && !currentAccount) {
      setCurrentAccount(accountsList[0])
    }
  }, [accountsList])

  const translatedAccType = type => {
    switch (type) {
      case 'pronote':
        return 'Pronote'
      default:
        return type
    }
  }

  const btnRef = useRef(null)

  if (!accountsList || accountsList.length < 2) {
    return null
  }

  return (
    <div>
      <Button
        ref={btnRef}
        busy={fetchStatus === 'loading'}
        label={
          <Typography
            noWrap
            variant="subtitle"
            color="body1"
            style={{ fontWeight: 600 }}
          >
            {currentAccount ? currentAccount.name : ''}
          </Typography>
        }
        onClick={() => setAccountMenuShown(true)}
        startIcon={
          <div
            style={{
              marginLeft: '2px',
              marginRight: '2px'
            }}
          >
            <Icon icon={People} size="14px" />
          </div>
        }
        endIcon={
          <div
            style={{
              marginLeft: '2px',
              marginRight: '2px',
              opacity: 0.5
            }}
          >
            <Icon icon={ExchangeIcon} size="14px" />
          </div>
        }
        style={{
          maxWidth: '100%'
        }}
        variant="secondary"
        size="small"
      />

      <Menu
        open={accountMenuShown}
        anchorEl={btnRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        keepMounted
        onClose={() => setAccountMenuShown(false)}
      >
        {accountsList.map(account => (
          <MenuItem
            key={account._id}
            onClick={() => {
              setCurrentAccount(account)
              setAccountMenuShown(false)
            }}
            selected={currentAccount?._id === account._id}
          >
            <ListItemIcon>
              <Icon icon={People} />
            </ListItemIcon>
            <ListItemText
              primary={account.name}
              secondary={translatedAccType(account.account_type)}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
