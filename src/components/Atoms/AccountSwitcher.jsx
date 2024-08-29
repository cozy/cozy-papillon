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

const getStudentClass = jobTitle => {
  if (jobTitle.includes('de')) {
    return jobTitle.split('de')[1].trim()
  }

  return jobTitle
}

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
        <Typography noWrap variant="h4" color="textPrimary">
          {currentAccount?.contact?.name?.givenName}{' '}
          {currentAccount?.contact?.name?.familyName}
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
            <div
              style={{
                minWidth: 42,
                width: 42,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '0px solid var(--secondaryColorLightest)',
                backgroundColor: 'var(--secondaryColorLightest)',
                borderRadius: '5px',
              }}
            >
              <p
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '12.5px',
                  color: 'var(--secondaryTextColor)',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {getStudentClass(account?.contact?.jobTitle)}
              </p>
            </div>
            <ListItemText>
              <Typography
                variant="body1"
                color="textPrimary"
                style={{ fontWeight: 600 }}
              >
                {account?.contact?.name?.givenName}{' '}
                {account?.contact?.name?.familyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {account?.contact?.company}
              </Typography>
            </ListItemText>
          </ActionsMenuItem>
        ))}
      </ActionsMenuWrapper>
    </div>
  )
}
