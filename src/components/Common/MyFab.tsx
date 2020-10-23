import { createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

interface Props {
  onDodaj: () => void;
}

const MyFab: React.FC<Props> = ({ onDodaj }) => {
  const classes = useStyles();

  return (
    <Fab className={classes.fab} color="secondary" onClick={onDodaj}>
      <AddIcon />
    </Fab>
  );
};

export default MyFab;
