import { List, ListItem, ListItemIcon, makeStyles, Theme, createStyles, Paper } from "@material-ui/core"
import React from 'react'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      height: "100%",
      width: 57,      
    },
    navbarPaper: {
      height: "100%",
      borderRight: "1px solid rgba(255, 255, 255, 0.12)",      
    },
    menuItemIcon: {
      margin: "4px 0",
    },    
  }),
);    

interface Props {
  apps: {
    path: string; 
    icon: JSX.Element;
  }[]
}

const Menu: React.FC<Props> = ({ apps }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <Paper elevation={0} square={true} className={classes.navbarPaper}>
        <List>
          {apps.map((app) => (
            <Link to={app.path}>
              <ListItem button key={app.path} >
                <ListItemIcon className={classes.menuItemIcon}>
                  {app.icon}
                </ListItemIcon>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </nav>
  )
}

export default Menu
