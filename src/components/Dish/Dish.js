import React, { useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EnhancedTable from '../EnhancedTable/EnhancedTable'
import useStyles from './DishStyles'

const Dish = ({ dishes, getDishes }) => {

  useEffect(() => {
    getDishes({ page: 0 })
  }, [getDishes])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const classes = useStyles()

  return (
    <Grid container alignItems="flex-start">

      <Grid item xs={12} md={4}>
        <Box m={3}>

          <Paper className={classes.Paper}>

            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Create a Dish
            </Typography>

            <form onSubmit={onSubmitHandler}>
              <FormGroup>

                <Grid item xs={12}>
                  <TextField className={classes.Field} label="Name" name="name" />
                </Grid>

                <Grid item xs={12}>
                  <TextField className={classes.Field} label="Description" name="Description" />
                </Grid>

                <Grid item xs={12}>
                  <TextField className={classes.Field} label="Price" name="Price" />
                </Grid>

              </FormGroup>

              <Grid item style={{ marginTop: 16 }}>
                <Button variant="contained" type="submit">Create</Button>
              </Grid>
            </form>
          </Paper>

        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box m={3}>
          <EnhancedTable title="Dishes" rows={dishes} />
        </Box>

      </Grid>

    </Grid>
  )
}

export default Dish
