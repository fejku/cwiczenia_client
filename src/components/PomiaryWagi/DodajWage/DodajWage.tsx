import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Waga from "../../../interfaces/Waga";
import MyDatePicker from "../../Common/MyDatePicker";
import MyFab from "../../Common/MyFab";
import { DodajWageContext } from "../Contexts/DodajWageContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface Props {
  wagi: Waga[];
  setWagi: React.Dispatch<React.SetStateAction<Waga[]>>;
}

const DodajWage: React.FC<Props> = ({ wagi, setWagi }) => {
  const classes = useStyles();

  const { czyWyswietlicDodawanieWagiGetSet: [czyWyswietlicDodawanieWagi, setCzyWyswietlicDodawanieWagi],
    dataGetSet: [data, setData],
    wagaGetSet: [waga, setWaga], 
  } = useContext(DodajWageContext);

  useEffect(() => {
    setWaga(dajOstatniaWage());
  }, [wagi]); // eslint-disable-line

  const dajOstatniaWage = () => {
    const ostatniaWaga = [...wagi].reverse()[0];

    if (ostatniaWaga) {
      return ostatniaWaga.waga.toFixed(1);
    }
    return "0.0";
  };

  const handleDataChange = (date: Date | null) => {
    if (date) {
      setData(date);
    }
  };

  const handleWagaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^\d*[.,]?\d?$/;
    if (pattern.test(event.target.value)) {
      setWaga(event.target.value);
    }
  };

  const handleWagaBlur = () => {
    const poprawionaWaga = waga.replace(",", ".");
    const pattern = /^\d+(\.\d{1})?$/;
    if (pattern.test(poprawionaWaga)) {
      setWaga(Number(poprawionaWaga).toFixed(1));
    } else {
      setWaga("0.0");
    }
  };

  const handleDodajClick = async () => {
    const dodawanaWaga: Waga = {
      data,
      waga: Number(waga),
    };

    const response = await fetch("/waga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dodawanaWaga),
    });
    const dodanaWaga: Waga = await response.json();

    if (dodanaWaga) {
      setWagi([...wagi, dodanaWaga]);
    }

    setCzyWyswietlicDodawanieWagi(false);
  };

  const handleAnulujClick = () => {
    setCzyWyswietlicDodawanieWagi(false);
  };

  return (
    <div>
      <MyFab setState={setCzyWyswietlicDodawanieWagi} />
      <Dialog open={czyWyswietlicDodawanieWagi}>
        <DialogTitle id="form-dialog-title">Dodaj wagę</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root}>
            <div>
              <MyDatePicker label="Data pomiaru" value={data} onChange={handleDataChange} />
            </div>
            <div>
              <TextField label="Waga" value={waga} onChange={handleWagaChange} onBlur={handleWagaBlur} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnulujClick} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDodajClick} color="primary">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DodajWage;
