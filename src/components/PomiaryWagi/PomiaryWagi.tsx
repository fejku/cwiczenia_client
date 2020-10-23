import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Waga from "../../interfaces/Waga";
import DodajWage from "./DodajWage/DodajWage";
import ListaWag from "./ListaWag/ListaWag";
import WykresWagi from "./WykresWagi/WykresWagi";
import { DodajWageProvider } from "./Contexts/DodajWageContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      display: "flex",
      padding: theme.spacing(2),
    },
    container: {
      height: "100%",
      flexGrow: 1,
      display: "flex",
    },
  }),
);

interface Props {}

const PomiaryWagi = (props: Props) => {
  const classes = useStyles();

  const [wagi, setWagi] = useState<Waga[]>([]);

  useEffect(() => {
    pobierzListeWag();
  }, []);

  const pobierzListeWag = async () => {
    const response = await fetch("/waga");
    const listaWag = await response.json();

    setWagi(listaWag);
  };

  return (
    <div className={classes.root}>
      <DodajWageProvider>
        <DodajWage wagi={wagi} setWagi={setWagi} />
        <div className={classes.container}>
          <ListaWag wagi={wagi} setWagi={setWagi} />
          <WykresWagi wagi={wagi} />
        </div>
      </DodajWageProvider>
    </div>
  );
};

export default PomiaryWagi;
