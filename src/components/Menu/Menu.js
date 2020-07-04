import React from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Menu = ({ }) => {

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Grid container alignItems="flex-start">

      <Grid item xs={6}>

        <h3>Create a Menu</h3>
        <form onSubmit={onSubmitHandler}>
          <TextField label="Name" name="name" />
          <TextField label="Description" />
          <TextField label="price" />

          <Button variant="contained" type="submit">Default</Button>
        </form>

      </Grid>

      <Grid item xs={6}>

        <h3>Menu list</h3>

      </Grid>

    </Grid>
  )
}

export default Menu
