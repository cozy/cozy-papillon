import React, { useRef, useState } from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import ActionsMenuWrapper from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuWrapper'
import Button from 'cozy-ui/transpiled/react/Buttons'
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import People from 'cozy-ui/transpiled/react/Icons/People'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { useAccountContext } from '../Provider/AccountProvider'

export const AccountSwitcher = () => {
  const { currentAccount, setCurrentAccount, accountsList, setAccountsList } =
    useAccountContext()
  const [accountMenuShown, setAccountMenuShown] = useState(false)

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
      <DropdownButton ref={btnRef} onClick={() => setAccountMenuShown(true)}>
        <Typography noWrap variant="h5" color="textPrimary">
          {currentAccount ? currentAccount.name : ''}
        </Typography>
      </DropdownButton>

      <ActionsMenuWrapper
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
          <ActionsMenuItem
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
          </ActionsMenuItem>
        ))}
      </ActionsMenuWrapper>
    </div>
  )
}
