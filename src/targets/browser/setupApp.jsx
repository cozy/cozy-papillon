import memoize from 'lodash/memoize'
import schema from 'src/doctypes'

import CozyClient, { WebFlagshipLink } from 'cozy-client'
import { isFlagshipApp, isFlagshipOfflineSupported } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import manifest from '../../../manifest.webapp'

/**
 * Make and returns cozy client instance
 * @param {HTMLElement} container - application container
 * @returns {import('cozy-client/types/CozyClient').default} cozy client instance
 */
const makeClient = (container, intent) => {
  const data = JSON.parse(container.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  const shouldUseWebFlagshipLink =
    isFlagshipApp() && isFlagshipOfflineSupported()

  const client = new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    links: shouldUseWebFlagshipLink
      ? [new WebFlagshipLink({ webviewIntent: intent })]
      : null
  })

  client.registerPlugin(flag.plugin)

  return client
}

const getDataOrDefault = (data, defaultData) =>
  /^\{\{\..*\}\}$/.test(data) ? defaultData : data

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(intent => {
  const container = document.querySelector('[role=application]')
  const client = makeClient(container, intent)
  const locale = JSON.parse(container.dataset.cozy)?.locale
  const lang = getDataOrDefault(locale, 'en')
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))

  return { client, lang, polyglot }
})

export default setupApp
