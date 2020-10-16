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
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyFab: React.FC<Props> = ({ setState }) => {
  const classes = useStyles();

  const onDodajClick = () => {
    setState(true);
  };

  return (
    <Fab className={classes.fab} color="secondary" onClick={onDodajClick}>
      <AddIcon />
    </Fab>
  );
};

export default MyFab;
