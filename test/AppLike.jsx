import React from 'react'
import { HashRouter } from 'react-router-dom'

import { CozyProvider, createMockClient } from 'cozy-client'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'

import enLocale from '../src/locales/en.json'

const AppLike = ({ children, client }) => (
  <CozyProvider client={client || createMockClient({})}>
    <I18n dictRequire={() => enLocale} lang="en">
      <BreakpointsProvider>
        <HashRouter>
          <AlertProvider>{children}</AlertProvider>
        </HashRouter>
      </BreakpointsProvider>
    </I18n>
  </CozyProvider>
)

export default AppLike
