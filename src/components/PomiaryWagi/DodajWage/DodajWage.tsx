import React, { useEffect, useState } from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Waga from "../../../interfaces/Waga";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import MyDatePicker from "../../Utils/MyDatePicker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

interface Props {
  wagi: Waga[];
  setWagi: React.Dispatch<React.SetStateAction<Waga[]>>;
}

const DodajWage: React.FC<Props> = ({ wagi, setWagi }) => {
  const classes = useStyles();

  const [dodawanieWagi, setDodawanieWagi] = useState(false);
  const [data, setData] = useState(new Date());
  const [poraPomiaru, setPoraPomiaru] = useState("rano");
  const [waga, setWaga] = useState("0.0");

  useEffect(() => {
    setWaga(dajOstatniaWage());
  }, [wagi]); // eslint-disable-line

  const dajOstatniaWage = () => {
    const ostatniaWaga = [...wagi].reverse()[0];

    if (ostatniaWaga) {
      if (ostatniaWaga.wagaWieczor) {
        return ostatniaWaga.wagaWieczor.toFixed(1);
      }
      if (ostatniaWaga.wagaRano) {
        return ostatniaWaga.wagaRano.toFixed(1);
      }
    }
    return "0.0";
  };

  const handleDodajWageClick = () => {
    setDodawanieWagi((prev) => !prev);
  };

  const handleDataChange = (date: Date | null) => {
    if (date) {
      setData(date);
    }
  };

  const handlePoraPomiaruChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setPoraPomiaru(newAlignment);
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
    };

    if (poraPomiaru === "rano") {
      dodawanaWaga.wagaRano = Number(waga);
    }

    if (poraPomiaru === "wieczor") {
      dodawanaWaga.wagaWieczor = Number(waga);
    }

    const response = await fetch("/waga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dodawanaWaga),
    });
    const listaWag: Waga[] = await response.json();

    setWagi(listaWag);
    setDodawanieWagi(false);
  };

  const handleAnulujClick = () => {
    setDodawanieWagi(false);
  };

  return (
    <div>
      <Fab className={classes.fab} color="secondary" onClick={handleDodajWageClick}>
        <AddIcon />
      </Fab>
      <Dialog open={dodawanieWagi}>
        <DialogTitle id="form-dialog-title">Dodaj wagę</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root}>
            <div>
              <MyDatePicker label="Data pomiaru" value={data} onChange={handleDataChange} />
            </div>
            <div>
              <ToggleButtonGroup value={poraPomiaru} exclusive onChange={handlePoraPomiaruChange}>
                <ToggleButton value="rano">Rano</ToggleButton>
                <ToggleButton value="wieczor">Wieczór</ToggleButton>
              </ToggleButtonGroup>
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
