import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "&:hover": {
        backgroundColor: "#3d3f46",
      },
      "&:hover $focus": {
        backgroundColor: "#2e8cdb",
      },
      "&:hover $icon": {
        fill: "#e5e6e6",
      },
    },
    focus: { width: 2 },
    icon: { width: 24, height: 24, fill: "#75777b", margin: "16px 16px 16px 14px" },
    active: {
      "& $focus": {
        backgroundColor: "#2e8cdb",
      },
      "& $icon": {
        fill: "#e5e6e6",
      },
    },
  }),
);

interface Props {
  icon: JSX.Element;
  to: string;
  activeOnlyWhenExact?: boolean;
}

const MenuIconWrapper: React.FC<Props> = ({ icon, to, activeOnlyWhenExact }) => {
  const classes = useStyles();

  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link to={to}>
      <div className={clsx(classes.root, { [classes.active]: match })}>
        <div className={classes.focus} />
        <div className={classes.icon}>{icon}</div>
      </div>
    </Link>
  );
};

export default MenuIconWrapper;
