import PropTypes from 'prop-types'
import React, { useReducer } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Pen from 'cozy-ui/transpiled/react/Icons/Pen'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'
import Input from 'cozy-ui/transpiled/react/Input'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const makeStyle = ({ isMobile, isRenaming }) => ({
  container: {
    minHeight: '3rem',
    marginBottom: '1rem',
    width: '100%',
    ...(!isRenaming && {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '-0.5rem'
    }),
    ...(isMobile && { textAlign: 'center' })
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }
})

export const Titlebar = ({ onChange, label }) => {
  const [isRenaming, toogleIsRenaming] = useReducer(
    isRenaming => !isRenaming,
    false
  )
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const style = makeStyle({ isMobile, isRenaming })

  const handleKeyDown = evt => {
    if (evt.key === 'Enter' || evt.key === 'Tab') {
      if (evt.target.value.trim() !== '') {
        onChange(evt.target.value, false)
        toogleIsRenaming()
      } else {
        onChange(evt.target.value, true)
        toogleIsRenaming()
      }
    } else if (evt.key === 'Escape') {
      toogleIsRenaming()
    }
  }

  const handleBlur = evt => {
    if (evt.target.value.trim() !== '') {
      onChange(evt.target.value, false)
      toogleIsRenaming()
    } else {
      onChange(evt.target.value, true)
      toogleIsRenaming()
    }
  }

  return (
    <>
      <div style={style.container}>
        {isRenaming ? (
          <Input
            type="text"
            ref={input => input && input.select()}
            defaultValue={label}
            style={{ maxHeight: '3rem', width: '100%' }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <IconButton className="u-mr-half" onClick={() => {}} size="medium">
              <Icon icon={Previous} size={16} />
            </IconButton>
            <div style={style.label}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="caption" style={{ fontSize: '1rem' }}>
                  {t('Titlebar.subtitle')}
                </Typography>
                <Typography variant="h3" onClick={toogleIsRenaming}>
                  {label}
                </Typography>
              </div>
              {!isMobile && (
                <IconButton onClick={toogleIsRenaming} tabIndex="-1">
                  <Icon icon={Pen} />
                </IconButton>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

Titlebar.propTypes = {
  label: PropTypes.string,
  setLabel: PropTypes.func
}
