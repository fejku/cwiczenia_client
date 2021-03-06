import React, { useEffect } from "react";
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
import IWaga from "../../../interfaces/IWaga";
import MyDatePicker from "../../Common/MyDatePicker";
import MyFab from "../../Common/MyFab";
import { useEdycjaWagiWyswietl, useEdycjaWagiData, useEdycjaWagiWaga } from "../EdycjaWagiContext";

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
  wagi: IWaga[];
  setWagi: React.Dispatch<React.SetStateAction<IWaga[]>>;
}

const EdycjaWagi: React.FC<Props> = ({ wagi, setWagi }) => {
  const classes = useStyles();

  const [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi] = useEdycjaWagiWyswietl();
  const [data, setData] = useEdycjaWagiData();
  const [waga, setWaga] = useEdycjaWagiWaga();

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

  const dodajWage = async (dodawanaWaga: IWaga) => {
    return await fetch("/waga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dodawanaWaga),
    });
  };

  const edytujWage = async (edytowanaWaga: IWaga) => {
    return await fetch(`/waga/${edytowanaWaga._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edytowanaWaga),
    });
  };

  const handleDodajClick = async () => {
    const ustawionaWaga: IWaga = {
      data,
      waga: Number(waga),
    };

    let response;
    if (czyEdycja) {
      response = await edytujWage(ustawionaWaga);
    } else {
      response = await dodajWage(ustawionaWaga);
    }
    const dodanaWaga: IWaga = await response.json();

    if (dodanaWaga) {
      setWagi([...wagi, dodanaWaga]);
    }

    setCzyWyswietlicEdycjeWagi(false);
  };

  const handleAnulujClick = () => {
    setCzyWyswietlicEdycjeWagi(false);
  };

  const onDodajWage = () => {
    setCzyWyswietlicEdycjeWagi(true);
  };

  return (
    <div>
      <MyFab onDodaj={onDodajWage} />
      <Dialog open={czyWyswietlicEdycjeWagi}>
        <DialogTitle id="form-dialog-title">{czyEdycja ? "Edycja" : "Dodawanie"} wagi</DialogTitle>
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

export default EdycjaWagi;
