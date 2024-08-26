import React, { createContext, useState } from 'react'
export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)

  return (
    <AccountContext.Provider value={{ currentAccount, setCurrentAccount }}>
      {children}
    </AccountContext.Provider>
  )
}
