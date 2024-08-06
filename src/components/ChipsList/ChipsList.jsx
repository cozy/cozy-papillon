import React, { useRef, useState } from 'react'
import Task from 'src/assets/icons/Task.svg'
import { ActionsMenuChip } from 'src/components/ActionsMenuChip/ActionMenuChip'

import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Chips from 'cozy-ui/transpiled/react/Chips'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Library from 'cozy-ui/transpiled/react/Icons/Library'
import LightbulbIcon from 'cozy-ui/transpiled/react/Icons/Lightbulb'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

const makeStyle = isMobile => ({
  chips: {
    display: 'flex',
    gap: '5px',
    ...(isMobile && {
      justifyContent: 'center'
    })
  }
})

const notionLabels = [
  'Guerre froide',
  'Rideau de fer',
  'États-Unis',
  'URSS',
  "Bloc de l'Ouest/Bloc de l'Est",
  'OTAN/Pacte de Varsovie',
  'Berlin',
  "Course à l'armement",
  'Crise des missiles de Cuba',
  "Droits de l'homme",
  'Idéologies opposées',
  'Nikita Khrouchtchev',
  'Mur de Berlin',
  'Élections libres',
  'Liberté de la presse',
  'Pop art',
  'Perestroïka',
  'Yalta'
]

const sourceLabels = [
  'Histoire-Géographie-EMC 3e - Collection 2021 - OCR - Guerre froide'
]

/**
 * Mocked component for Demo purposes
 */
export const ChipsList = () => {
  const refSource = useRef()
  const refNotion = useRef()
  const [openWith, setOpenWith] = useState([])
  const [actualRef, setActualRef] = useState({ current: null })
  const { isMobile } = useBreakpoints()
  const style = makeStyle(isMobile)

  return (
    <>
      <div style={style.chips}>
        <Chips
          icon={<Icon icon={Task} className="u-ml-half" />}
          label="Type"
          onClick={() => {}}
        />
        <Chips
          icon={<Icon icon={Library} className="u-ml-half" />}
          ref={refSource}
          label="Source"
          onClick={() => {
            setActualRef(refSource)
            setOpenWith(sourceLabels)
          }}
          onDelete={() => {}}
          deleteIcon={
            <Avatar
              className="u-w-1 u-h-1"
              style={{
                backgroundColor: 'var(--primaryColor)',
                color: 'var(--primaryContrastTextColor)',
                fontSize: 11,
                marginBottom: '1px'
              }}
              size="xsmall"
              text={sourceLabels.length.toString()}
            />
          }
        />
        <Chips
          icon={<Icon icon={LightbulbIcon} className="u-ml-half" />}
          ref={refNotion}
          label="Notion"
          onClick={() => {
            setActualRef(refNotion)
            setOpenWith(notionLabels)
          }}
          onDelete={() => {}}
          deleteIcon={
            <Avatar
              className="u-w-1 u-h-1"
              style={{
                backgroundColor: 'var(--primaryColor)',
                color: 'var(--primaryContrastTextColor)',
                fontSize: 11,
                marginBottom: '1px'
              }}
              size="xsmall"
              text={notionLabels.length.toString()}
            />
          }
        />
      </div>
      <ActionsMenuChip
        open={openWith.length > 0}
        labels={openWith}
        onClose={() => setOpenWith([])}
        ref={actualRef}
      />
    </>
  )
}
