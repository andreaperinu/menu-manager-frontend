import React from 'react'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import classNames from 'classnames'

import useStyles from './EnhancedTableToolbarStyles'

const EnhancedTableToolbar = ({ title, selected, action, bulkAction }) => {
  const classes = useStyles()

  const numSelected = selected.length

  const onClickHandler = () => numSelected > 1 ? bulkAction(selected) : action(selected[0])

  return (
    <Toolbar className={classNames(classes.root, { [classes.highlight]: numSelected > 0 })}>
      {
        numSelected > 0 ?
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          :
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
      }

      {
        numSelected > 0 ?
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={onClickHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          :
          null
      }
    </Toolbar>
  )
}

export default EnhancedTableToolbar
