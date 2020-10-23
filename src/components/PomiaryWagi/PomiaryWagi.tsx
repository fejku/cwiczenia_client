import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import IWaga from "../../interfaces/IWaga";
import EdycjaWagi from "./EdycjaWagi/EdycjaWagi";
import ListaWag from "./ListaWag/ListaWag";
import WykresWagi from "./WykresWagi/WykresWagi";
import { EdycjaWagiProvider } from "./EdycjaWagiContext";

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

  const [wagi, setWagi] = useState<IWaga[]>([]);

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
      <EdycjaWagiProvider>
        <EdycjaWagi wagi={wagi} setWagi={setWagi} />
        <div className={classes.container}>
          <ListaWag wagi={wagi} setWagi={setWagi} />
          <WykresWagi wagi={wagi} />
        </div>
      </EdycjaWagiProvider>
    </div>
  );
};

export default PomiaryWagi;
