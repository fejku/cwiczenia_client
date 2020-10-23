import React, { useContext, useState } from "react";
import { createStyles, IconButton, ListItemIcon, makeStyles, Menu, MenuItem, Theme, Typography } from "@material-ui/core";
import moment from "moment";
import Waga from "../../../interfaces/Waga";
import ArrowUpIcon from "../../Icons/ArrowUpIcon";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { DodajWageContext } from "../Contexts/DodajWageContext";

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

  const { 
    czyWyswietlicDodawanieWagiGetSet: [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi], 
    dataGetSet: [edycjadata, setEdycjasetData],
    wagaGetSet: [edycjaWaga, setEdycjasetWaga],  
  } = useContext(DodajWageContext);

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  }
  
  const onMenuClose = () => {
    setMenuAnchor(null);
  }

  const onMenuEditClick = async () => {
    setEdycjasetData(waga.data);
    setEdycjasetWaga(waga.waga.toFixed(1));
    setCzyWyswietlicEdycjeWagi(true);
    setMenuAnchor(null);
  }  
  
  const onMenuUsunClick = async () => {
    const response = await fetch(`/waga/${waga._id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setWagi(wagi => [...wagi.filter(w => w._id !== waga._id)]);
    }
    setMenuAnchor(null);
  }  

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
          <IconButton onClick={onMenuClick} size="small" >
            <MoreHorizIcon  />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={onMenuClose}
          >
            <MenuItem onClick={onMenuEditClick}><ListItemIcon></ListItemIcon> Edytuj</MenuItem>
            <MenuItem onClick={onMenuUsunClick}>Usuń</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default WagaRow;
