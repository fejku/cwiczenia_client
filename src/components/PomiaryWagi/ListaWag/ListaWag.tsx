import React from "react";
import { createStyles, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import Waga from "../../../interfaces/Waga";
import WagaRow from "./WagaRow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 290,
      display: "flex",
      flexDirection: "column",
    },
    listWrapper: {
      height: "100%",
      overflowY: "auto",
      paddingRight: theme.spacing(1),
    },
    title: {
      fontWeight: "bold",
      marginBottom: theme.spacing(1),
    },
  }),
);

interface Props {
  wagi: Waga[];
  setWagi: React.Dispatch<React.SetStateAction<Waga[]>>;
}

const ListaWag: React.FC<Props> = ({ wagi, setWagi }) => {
  const classes = useStyles();

  const posortowaneWagi = () => [...wagi].reverse();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h5">Historia</Typography>
      </div>
      <div className={classes.listWrapper}>
        {posortowaneWagi().map((waga) => (
          <WagaRow key={waga._id} waga={waga} setWagi={setWagi} />
        ))}
      </div>
    </div>
  );
};

export default ListaWag;
