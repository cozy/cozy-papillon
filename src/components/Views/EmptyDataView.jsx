import React from 'react'

import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Empty from 'cozy-ui/transpiled/react/Empty'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import PronoteIcon from '../../assets/brands/pronote.svg'
import ImportSchoolIcon from '../../assets/illustrations/import-school.svg'

export const EmptyDataView = () => {
  const { t } = useI18n()

  const client = useClient()

  const { url: pronoteKonnectorUrl } = useAppLinkWithStoreFallback(
    'pronote',
    client,
    '/'
  )

  const { url: storeEducationUrl } = useAppLinkWithStoreFallback(
    'store',
    client,
    '#/discover?type=konnector&category=education'
  )

  return (
    <div className="u-db-s u-flex u-flex-column u-items-center u-justify-center u-p-2">
      <Empty
        icon={<img src={ImportSchoolIcon} style={{ height: 208 }} />}
        iconSize="large"
        title={t('Layout.onboardImportText')}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.8rem'
          }}
        >
          <AppLinker app={{ slug: 'pronote' }} href={pronoteKonnectorUrl}>
            {({ onClick, href }) => (
              <Button
                onClick={onClick}
                variant="secondary"
                label={t('Layout.importFromButton') + ' Pronote'}
                startIcon={<img src={PronoteIcon} alt="Pronote" />}
                style={{ width: '100%' }}
                href={href}
              />
            )}
          </AppLinker>

          <AppLinker app={{ slug: 'store' }} href={storeEducationUrl}>
            {({ onClick, href }) => (
              <Button
                onClick={onClick}
                variant="ghost"
                label={t('Layout.exploreServices')}
                style={{ width: '100%' }}
                href={href}
              />
            )}
          </AppLinker>
        </div>
      </Empty>
    </div>
  )
}
