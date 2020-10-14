import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Waga from "../../../interfaces/Waga";
import WagaRow from "./WagaRow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listWrapper: {
      width: 270,
      position: "relative",
      overflow: "auto",
    },
    list: {
      display: "grid",
      gridTemplateColumns: "10ch 1fr 1fr 24px",
      gridTemplateRows: "max-content",
      gridAutoRows: "24px",
      gridRowGap: 16,
      position: "absolute",
    },
    center: {
      textAlign: "center",
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
    <div className={classes.listWrapper}>
      <div className={classes.list}>
        <div>Data</div>
        <div className={classes.center}>Waga rano</div>
        <div className={classes.center}>Waga wieczorem</div>
        <div></div>
        {posortowaneWagi().map((waga) => (
          <WagaRow key={waga._id} waga={waga} setWagi={setWagi} />
        ))}
      </div>
    </div>
  );
};

export default ListaWag;
