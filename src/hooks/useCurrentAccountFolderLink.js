import { useState, useEffect } from 'react'
import { buildAccountFolderQuery } from 'src/queries'

import { useClient, generateWebLink } from 'cozy-client'

import { useAccountContext } from '../components/Provider/AccountProvider'

const useCurrentAccountFolderLink = () => {
  const client = useClient()
  const { currentAccount } = useAccountContext()

  const [currentAccountFolderLink, setCurrentAccountFolderLink] = useState(null)

  useEffect(() => {
    const fetchCurrentAccountFolderLink = async () => {
      const accountFolderQuery = buildAccountFolderQuery(
        currentAccount?.cozyMetadata?.sourceAccountIdentifier
      )

      const { data } = await client.query(
        accountFolderQuery.definition(),
        accountFolderQuery.options
      )

      const webLink = generateWebLink({
        cozyUrl: client.getStackClient().uri,
        slug: 'drive',
        subDomainType: client.capabilities.flat_subdomains ? 'flat' : 'nested',
        pathname: '',
        hash: `/folder/${data[0]._id}`,
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
