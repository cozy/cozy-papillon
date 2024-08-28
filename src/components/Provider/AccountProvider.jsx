import React, { createContext, useEffect, useState } from 'react'
import { buildAccountsQuery } from 'src/queries'

import { useQuery } from 'cozy-client'
export const AccountContext = createContext()

export const useAccountContext = () => {
  const context = React.useContext(AccountContext)
  return context
}

export const AccountProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)

  const accountsQuery = buildAccountsQuery()

  const { data: accounts, fetchStatus } = useQuery(
    accountsQuery.definition,
    accountsQuery.options
  )

  const [accountsList, setAccountsList] = useState([])

  useEffect(() => {
    if (fetchStatus === 'loaded') {
      setAccountsList(accounts)
    }
  }, [fetchStatus])

  useEffect(() => {
    if (accountsList.length > 0 && !currentAccount) {
      setCurrentAccount(accountsList[0])
    }
  }, [accountsList])

  return (
    <AccountContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        accountsList,
        setAccountsList,
        fetchStatus
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}