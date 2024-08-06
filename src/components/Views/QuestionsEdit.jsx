import React, { useState } from 'react'
import { ChipsList } from 'src/components/ChipsList/ChipsList'
import { Titlebar } from 'src/components/Titlebar'

import minilog from 'cozy-minilog'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Dots from 'cozy-ui/transpiled/react/Icons/Dots'
import Paperplane from 'cozy-ui/transpiled/react/Icons/Paperplane'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const log = minilog('QuestionsEdit')

const makeStyle = isMobile => ({
  header: {
    display: 'flex',
    padding: '1.5rem 2rem',
    justifyContent: 'space-between'
  },
  titlebar: {
    maxwidth: '100%',
    flex: 2
  },
  btnGroup: {
    display: 'flex',
    gap: '0.5rem',
    paddingTop: '0.25rem'
  },
  fab: {
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    zIndex: 10
  },
  iframeContainer: {
    position: 'relative',
    height: isMobile ? 'calc(100% - 228px)' : '100%'
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0'
  }
})

const mockedQuestion =
  'Réviser tout le chapitre "La Guerre Froide opposant les États-Unis et l\'URSS"'

const defaultURL =
  'https://backoffice-preprod.stellia.ai/v2/corpus/436/exercises_modified_theme#'

const updateSearchTerm = newSearchTerm => {
  if (!newSearchTerm) return defaultURL
  const url = new URL(defaultURL)
  let hashParams = new URLSearchParams(url.hash.slice(1))
  hashParams.set('searchTerm', encodeURIComponent(newSearchTerm))
  url.hash = hashParams.toString()

  // Limiting the total URL length to 2048 ensures that it will work correctly in any browser.
  if (url.toString().length > 2048) {
    log.warn('URL too long, trimming search term')
  }

  return url.toString()
}

export const QuestionsEdit = () => {
  const [name, setName] = useState(mockedQuestion)
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (val, resetSearchTerm) => {
    const hasNewName = val.length > 0 && val !== mockedQuestion
    const hasNewSearchTerm = resetSearchTerm || val !== mockedQuestion
    setName(hasNewName ? val : mockedQuestion)
    setSearchTerm(hasNewSearchTerm ? val : '')
  }

  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  const iframeSrc = updateSearchTerm(searchTerm)

  return (
    <>
      <div style={style.header}>
        <div style={style.titlebar}>
          <Titlebar label={name} onChange={handleChange} />
          <ChipsList />
        </div>
        {!isMobile && (
          <div style={style.btnGroup}>
            <Buttons
              label={t('QuestionsEdit.btn.saveDraft')}
              variant="secondary"
              onClick={() => {}}
            />
            <Buttons
              label={t('QuestionsEdit.btn.sendToStudents')}
              startIcon={<Icon icon={Paperplane} />}
              onClick={() => {}}
            />
            <Buttons
              label={<Icon icon={Dots} />}
              variant="secondary"
              className="u-miw-auto"
              onClick={() => {}}
            />
          </div>
        )}
        {isMobile && (
          <div style={style.fab}>
            <Fab
              color="primary"
              variant="extended"
              onClick={() => {}}
              aria-label={t('QuestionsEdit.btn.save')}
            >
              <Icon icon={Paperplane} className="u-mr-half" />
              {t('QuestionsEdit.btn.sendToStudents')}
            </Fab>
          </div>
        )}
      </div>
      <div style={style.iframeContainer}>
        <iframe style={style.iframe} src={iframeSrc} />
      </div>
    </>
  )
}
