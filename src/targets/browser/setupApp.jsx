import memoize from 'lodash/memoize'
import { createRoot } from 'react-dom/client'
import schema from 'src/doctypes'

import CozyClient from 'cozy-client'
import flag from 'cozy-flags'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import manifest from '../../../manifest.webapp'

/**
 * Make and returns cozy client instance
 * @param {HTMLElement} container - application container
 * @returns {import('cozy-client/types/CozyClient').default} cozy client instance
 */
const makeClient = container => {
  const data = JSON.parse(container.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  const client = new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: true
  })

  return client
}

const getDataOrDefault = (data, defaultData) =>
  /^\{\{\..*\}\}$/.test(data) ? defaultData : data

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const client = makeClient(container)
  const locale = JSON.parse(container.dataset.cozy)?.locale
  const lang = getDataOrDefault(locale, 'en')
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  client.registerPlugin(flag.plugin)

  return { root, client, lang, polyglot }
})

export default setupApp
