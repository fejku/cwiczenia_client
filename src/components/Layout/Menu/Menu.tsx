import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import LogoIcon from "../../Icons/LogoIcon";
import MenuIconWrapper from "./MenuIconWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      height: "100%",
      width: 56,
      backgroundColor: "#2c2f36",
    },
    logo: {
      width: 40,
      height: 40,
      fill: "#aaabae",
      margin: theme.spacing(1),
      marginBottom: theme.spacing(4),
    },
  }),
);

interface Props {
  apps: {
    path: string;
    icon: JSX.Element;
    activeOnlyWhenExact?: boolean;
  }[];
}

const Menu: React.FC<Props> = ({ apps }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <LogoIcon className={classes.logo} />
      {apps.map((app) => (
        <MenuIconWrapper key={app.path} icon={app.icon} to={app.path} activeOnlyWhenExact={app.activeOnlyWhenExact} />
      ))}
    </nav>
  );
};

export default Menu;
