import React, { useEffect, useState } from 'react'
import AppProviders from 'src/components/AppProviders'
import AppRouter from 'src/components/AppRouter'
import setupApp from 'src/targets/browser/setupApp'

import { isFlagshipApp } from 'cozy-device-helper'
import CozyDevtools from 'cozy-devtools'
import flag from 'cozy-flags'
import { useWebviewIntent, WebviewIntentProvider } from 'cozy-intent'

const Wrapper = () => {
  const webviewIntent = useWebviewIntent()
  const [appContext, setAppContext] = useState(undefined)

  useEffect(() => {
    if (isFlagshipApp() && !webviewIntent) return

    const newAppContext = setupApp(webviewIntent)

    setAppContext(newAppContext)
  }, [webviewIntent])

  if (!appContext) {
    return null
  }

  const { client, lang, polyglot } = appContext

  return (
    <AppProviders client={client} lang={lang} polyglot={polyglot}>
      <AppRouter />
      {flag('debug') && <CozyDevtools />}
    </AppProviders>
  )
}

export const AppWrapper = () => {
  return (
    <WebviewIntentProvider>
      <Wrapper />
    </WebviewIntentProvider>
  )
}
