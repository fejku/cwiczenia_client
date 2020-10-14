import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import moment from "moment";
import Waga from "../../../interfaces/Waga";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cellAction: {
      position: "relative",
    },
    cellActionIcons: {
      position: "absolute",
      right: 0,
      top: 0,
      "& > svg": {
        width: "0.9rem",
        height: "0.9rem",
        padding: "2px",
        cursor: "pointer",
      },
    },
    center: {
      textAlign: "center",
    },
    deleteIcon: {
      cursor: "pointer",
    },
  }),
);

interface Props {
  waga: Waga;
  setWagi: React.Dispatch<React.SetStateAction<Waga[]>>;
}

const WagaRow: React.FC<Props> = ({ waga, setWagi }) => {
  const classes = useStyles();

  const handleUsunClick = async () => {
    const response = await fetch(`/waga/${waga._id}`, {
      method: "DELETE",
    });
    const listaWag: Waga[] = await response.json();
    setWagi(listaWag);
  };

  return (
    <>
      <div>{moment(waga.data).format("YYYY-MM-DD")}</div>
      <div className={classes.center}>{waga.wagaRano && waga.wagaRano.toFixed(1)}</div>
      <div className={classes.center}>{waga.wagaWieczor && waga.wagaWieczor.toFixed(1)}</div>
      <div>
        <DeleteForeverIcon className={classes.deleteIcon} onClick={handleUsunClick} />
      </div>
    </>
  );
};

export default WagaRow;
