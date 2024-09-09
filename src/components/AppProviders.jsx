import React from 'react'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { AccountProvider } from './Provider/AccountProvider'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const AppProviders = ({ client, lang, polyglot, children }) => {
  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <BarProvider>
            <I18n lang={lang} polyglot={polyglot}>
              <CozyTheme>
                <BreakpointsProvider>
                  <AccountProvider>
                    <AlertProvider>{children}</AlertProvider>
                  </AccountProvider>
                </BreakpointsProvider>
              </CozyTheme>
            </I18n>
          </BarProvider>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
