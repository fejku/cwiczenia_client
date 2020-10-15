import React from "react";
import { createMuiTheme, createStyles, CssBaseline, makeStyles, Theme, ThemeProvider } from "@material-ui/core";
import MainMenu from "./MainMenu/MainMenu";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Menu from "./Menu/Menu";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    container: {
      height: "100%",
      flex: 1,
      display: "flex",
    },
    content: {
      flexGrow: 1,
    },
  }),
);

interface Props {
  apps: {
    path: string;
    component: JSX.Element;
    icon: JSX.Element;
  }[];
}

const Layout: React.FC<Props> = ({ apps }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <MainMenu />
        <div className={classes.container}>
          <Router>
            <Menu
              apps={apps.map((app) => ({
                path: app.path,
                icon: app.icon,
              }))}
            />
            <Switch>
              {apps.map((app) => (
                <Route key={app.path} path={app.path} exact={app.path === "/"}>
                  {app.component}
                </Route>
              ))}
            </Switch>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
