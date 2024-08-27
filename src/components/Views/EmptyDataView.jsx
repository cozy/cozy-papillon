import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Empty from 'cozy-ui/transpiled/react/Empty'

import ImportSchoolIcon from '../../assets/illustrations/import-school.svg'
import PronoteIcon from '../../assets/brands/pronote.svg'
import EcoleDirecteIcon from '../../assets/brands/ecoledirecte.svg'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const EmptyDataView = () => {
  const { t } = useI18n()

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
            marginTop: '0.8rem',
          }}
        >
          <Button
            variant="secondary"
            label={t('Layout.importFromButton') + ' Pronote'}
            startIcon={<img src={PronoteIcon} alt="Pronote" />}
            style={{ width: '100%' }}
            onClick={() => {
              // #TODO: Implement Pronote import
            }}
          />

          <Button
            variant="ghost"
            label={t('Layout.exploreServices')}
            style={{ width: '100%' }}
          />
        </div>
      </Empty>
    </div>
  )
}
