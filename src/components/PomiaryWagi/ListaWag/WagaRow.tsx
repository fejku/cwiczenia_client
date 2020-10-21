import React from "react";
import { createStyles, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import moment from "moment";
import Waga from "../../../interfaces/Waga";
import ArrowUpIcon from "../../Icons/ArrowUpIcon";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#fff",
      margin: "4px 0",
      padding: "16px 20px",
      borderRadius: "8px",
      justifyContent: "space-between",
      position: "relative",
    },
    dataRoznicaWrapper: { display: "flex", flexDirection: "column", justifyContent: "space-evenly" },
    data: { color: "#75777b", fontSize: "smaller", paddingBottom: 2 },
    wagaRoznicaWrapper: { display: "flex", alignItems: "center" },
    wagaRoznicaIcon: { width: "0.8rem", height: "0.8rem" },
    wagaRoznicaText: { paddingLeft: theme.spacing(0.75) },
    waga: { display: "flex", alignItems: "flex-end" },
    wagaLabel: { fontSize: "1.75rem", paddingRight: theme.spacing(0.5) },
    wagaKg: { fontSize: "smaller" },
    wagaAkcje: { 
      position: "absolute", top: 2, right: 2 
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
      <div className={classes.root}>
        <div className={classes.dataRoznicaWrapper}>
          <div className={classes.data}>{moment(waga.data).fromNow()}</div>
          <div className={classes.wagaRoznicaWrapper}>
            <ArrowUpIcon className={classes.wagaRoznicaIcon} />
            <div className={classes.wagaRoznicaText}>0.5 kg</div>
          </div>
        </div>
        <div className={classes.waga}>
          <Typography variant="h4" className={classes.wagaLabel}>
            {waga.waga.toFixed(1)}
          </Typography>
          <Typography variant="h6" className={classes.wagaKg}>
            kg
          </Typography>
        </div>
        <div className={classes.wagaAkcje}>
          <IconButton size="small"  >
            <MoreHorizIcon  />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default WagaRow;
