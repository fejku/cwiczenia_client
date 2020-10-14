import React from 'react'
import { AppBar, createStyles, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

interface Props {
  
}

const MainMenu = (props: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Krystian Kalita
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MainMenu
