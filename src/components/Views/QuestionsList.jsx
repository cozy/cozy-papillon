import React from 'react'

import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Right from 'cozy-ui/transpiled/react/Icons/Right'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const QuestionsList = () => {
  return (
    <>
      <div className="u-p-1">
        <Typography variant="h3">Histoire Géographie</Typography>
        <div>IMAGE</div>
      </div>
      <List>
        <ListItem>
          <ListItemText primary="Nom" style={{ width: '35rem' }} />
          <ListItemText secondary="MISE A JOUR" />
          <ListItemText secondary="EXERCICES" />
          <ListItemText secondary="MAITRISE" style={{ marginLeft: '4rem' }} />
        </ListItem>
        <Divider component="li" />
        <ListItem button>
          <ListItemText
            primary="Simplifier les fractions"
            style={{ width: '35rem' }}
          />
          <ListItemText secondary="1é mars 2024" />
          <ListItemText secondary="32" />
          <Typography
            style={{ color: 'var(--secondaryTextColor)', marginRight: '4rem' }}
            variant="body2"
          >
            62%
          </Typography>
          <ListItemIcon>
            <Icon icon={Right} />
          </ListItemIcon>
        </ListItem>
        <Divider component="li" />
        <ListItem button>
          <ListItemText
            primary="Ecrire des quotients sous la forme d'une fraction"
            style={{ width: '35rem' }}
          />
          <ListItemText secondary="1é mars 2024" />
          <ListItemText secondary="28" />
          <Typography
            style={{ color: 'var(--secondaryTextColor)', marginRight: '4rem' }}
            variant="body2"
          >
            86%
          </Typography>
          <ListItemIcon>
            <Icon icon={Right} />
          </ListItemIcon>
        </ListItem>
      </List>
    </>
  )
}
