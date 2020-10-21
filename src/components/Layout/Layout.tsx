import React from "react";
import { createMuiTheme, createStyles, CssBaseline, makeStyles, Theme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Menu from "./Menu/Menu";

const theme = createMuiTheme({
  palette: {},
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      backgroundColor: "#f5f5f7",
    },
  }),
);

interface Props {
  apps: {
    path: string;
    component: JSX.Element;
    icon: JSX.Element;
    activeOnlyWhenExact?: boolean;
  }[];
}

const Layout: React.FC<Props> = ({ apps }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Router>
          <Menu
            apps={apps.map((app) => ({
              path: app.path,
              icon: app.icon,
              activeOnlyWhenExact: app.activeOnlyWhenExact,
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
    </ThemeProvider>
  );
};

export default Layout;
