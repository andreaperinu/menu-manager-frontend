import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EnhancedTable from '../EnhancedTable/EnhancedTable'
import useStyles from './DishStyles'
import { A, useStore } from '../../store';

const Dish = ({ dishes, getDishes }) => {

  const dispatch = useStore(false)[1]

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    getDishes({ page: 0 })
  }, [getDishes])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(A.CREATE_DISH, { name, description, price })
  }

  const classes = useStyles()

  return (
    <Grid container alignItems="flex-start">

      <Grid item xs={12} lg={4}>
        <Box m={3}>

          <Paper className={classes.Paper}>

            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Create a Dish
            </Typography>

            <form onSubmit={onSubmitHandler}>
              <FormGroup>

                <Grid item xs={12}>
                  <TextField
                    className={classes.Field} label="Name" value={name}
                    onChange={({ target: { value } }) => setName(value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.Field} label="Description" value={description}
                    onChange={({ target: { value } }) => setDescription(value)}

                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.Field} label="Price" value={price}
                    onChange={({ target: { value } }) => setPrice(+value)}

                  />
                </Grid>

              </FormGroup>

              <Grid item style={{ marginTop: 16 }}>
                <Button variant="contained" type="submit">Create</Button>
              </Grid>

            </form>
          </Paper>

        </Box>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Box m={3}>
          <EnhancedTable title="Dishes" rows={dishes} />
        </Box>

      </Grid>

    </Grid>
  )
}

export default Dish
