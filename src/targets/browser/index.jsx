/* eslint-disable import/order */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-bar/dist/stylesheet.css'

import 'src/styles/index.styl'
import React from 'react'
// import { render } from 'react-dom'
import AppProviders from 'src/components/AppProviders'
import setupApp from 'src/targets/browser/setupApp'
import AppRouter from 'src/components/AppRouter'

const init = function () {
  const { root, client, lang, polyglot } = setupApp()

  root.render(
    <AppProviders client={client} lang={lang} polyglot={polyglot}>
      <AppRouter />
      <p>Hey !</p>
    </AppProviders>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
