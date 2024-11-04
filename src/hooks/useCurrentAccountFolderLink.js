import { useState, useEffect } from 'react'
import { buildAccountQuery, buildTriggerQuery } from 'src/queries'

import { useClient, generateWebLink } from 'cozy-client'

import { useAccountContext } from '../components/Provider/AccountProvider'

const useCurrentAccountFolderLink = () => {
  const client = useClient()
  const { currentAccount } = useAccountContext()

  const [currentAccountFolderLink, setCurrentAccountFolderLink] = useState(null)

  useEffect(() => {
    const fetchCurrentAccountFolderLink = async () => {
      const accountQuery = buildAccountQuery()

      const { data: accountResult } = await client.query(
        accountQuery.definition(),
        accountQuery.options
      )

      if (!accountResult[0]?._id) {
        return
      }

      const triggerQuery = buildTriggerQuery(accountResult[0]._id)

      const { data: triggerResult } = await client.query(
        triggerQuery.definition(),
        triggerQuery.options
      )

      if (!triggerResult[0]?.message?.folder_to_save) {
        return
      }

      const webLink = generateWebLink({
        cozyUrl: client.getStackClient().uri,
        slug: 'drive',
        subDomainType: client.capabilities.flat_subdomains ? 'flat' : 'nested',
        pathname: '',
        hash: `/folder/${triggerResult[0].message.folder_to_save}`,
        searchParams: []
      })

      setCurrentAccountFolderLink(webLink)
    }

    if (currentAccount) {
      fetchCurrentAccountFolderLink()
    }
  }, [client, currentAccount])

  return currentAccountFolderLink
}

export default useCurrentAccountFolderLink
