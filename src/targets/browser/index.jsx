/* eslint-disable import/order */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-bar/dist/stylesheet.css'

import 'src/styles/index.styl'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { AppWrapper } from 'src/components/AppWrapper'

const init = function () {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)

  root.render(<AppWrapper />)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
