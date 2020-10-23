import React, { useEffect, useState } from "react";
import clsx from "clsx";
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
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EditDishHelper from "./EditDishHelper";
import { Autocomplete } from "@material-ui/lab";
import Tag from "../../../../interfaces/Tag";
import MyFab from "../../../Common/MyFab";
import Potrawa from "../../../../interfaces/Potrawa";

const useStyles = (zdjecieSrc: string) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
        },
      },
      dialog: {
        width: 500,
      },
      zdjecie: {
        height: 0,
        paddingTop: "56.25%", // 16:9
        border: `1px solid ${theme.palette.text.disabled}`,
      },
      zdjecieImg: {
        backgroundImage: `url("${zdjecieSrc}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      brakZdjecia: {
        position: "relative",
        "& > svg": {
          fontSize: "5rem",
          position: "absolute",
          left: "calc(50% - 2.5rem)",
          top: "calc(50% - 2.5rem)",
        },
      },
      actions: {
        "& > button": {
          color: theme.palette.primary.light,
        },
      },
    }),
  );

interface Props {
  setPotrawy: React.Dispatch<React.SetStateAction<Potrawa[]>>;
}

const EditDish: React.FC<Props> = ({ setPotrawy }) => {
  const [dodawanieWagi, setDodawanieWagi] = useState(false);
  const [nazwa, setNazwa] = useState("");
  const [zdjecieSrc, setZdjecieSrc] = useState("");
  const [pokazZdjecie, setPokazZdjecie] = useState(false);
  const [uwagi, setUwagi] = useState("");
  const [tagi, setTagi] = useState<Tag[]>([]);
  const [wybraneTagi, setWybraneTagi] = useState<Tag[]>([]);
  const [linkDoPrzepisu, setLinkDoPrzepisu] = useState("");

  const classes = useStyles(zdjecieSrc)();

  useEffect(() => {
    pobierzTagi();
  }, []);

  const pobierzTagi = async () => {
    const response = await fetch("/food/tagi");
    const data = await response.json();
    setTagi(data);
  };

  const onDodajDish = () => {
    setDodawanieWagi(true);
  };

  const onNazwaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNazwa(event.target.value);
  };

  const onZdjecieSrcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZdjecieSrc(event.target.value);
  };

  const onZdjecieSrcBlur = async () => {
    const isValidImg = await EditDishHelper.isImageExists(zdjecieSrc);
    if (isValidImg) {
      setPokazZdjecie(true);
    } else {
      setPokazZdjecie(false);
    }
  };

  const onUwagiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUwagi(event.target.value);
  };

  const onTagiChange = (event: any, values: Tag[]) => {
    setWybraneTagi(values);
  };

  const onTagiInputKeyDown = async (event: any) => {
    const value = event.target.value;
    if (event.key === "Enter" && value) {
      const wyszukanyTag = tagi.find((tag) => tag.nazwa === value);

      if (wyszukanyTag) {
        const wyszukanyWybranyTag = wybraneTagi.find((tag) => tag.nazwa === value);
        if (!wyszukanyWybranyTag) {
          setWybraneTagi([...wybraneTagi, wyszukanyTag]);
        }
      } else {
        const noweTagi = await EditDishHelper.dodajNowyTag(value);

        const dodanyTag = noweTagi.find((tag) => tag.nazwa === value);
        if (dodanyTag) {
          console.log(wybraneTagi);
          setWybraneTagi((prevTagi) => [...prevTagi, dodanyTag]);
        }
        setTagi(noweTagi);
      }
    }
  };

  const onLinkDoPrzepisuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkDoPrzepisu(event.target.value);
  };

  const onAnulujClick = () => {
    setDodawanieWagi(false);
  };

  const onDodajClick = async () => {
    const dodawanaPotrawa: Potrawa = {
      nazwa,
      zdjecie: zdjecieSrc,
      uwagi,
      tagi: wybraneTagi,
      link: linkDoPrzepisu,
    };

    const nowePotrawy = await EditDishHelper.dodajPotrawe(dodawanaPotrawa);
    setPotrawy(nowePotrawy);
    setDodawanieWagi(false);
  };

  return (
    <div>
      <MyFab onDodaj={onDodajDish} />
      <Dialog fullWidth maxWidth={"sm"} open={dodawanieWagi}>
        <DialogTitle>Dodaj potrawę</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root}>
            <div>
              <TextField label="Nazwa potrawy" value={nazwa} onChange={onNazwaChange} fullWidth />
            </div>
            <div>
              <TextField
                label="Link do zdjęcia"
                value={zdjecieSrc}
                onChange={onZdjecieSrcChange}
                onBlur={onZdjecieSrcBlur}
                fullWidth
              />
            </div>
            <div
              className={clsx(classes.zdjecie, {
                [classes.zdjecieImg]: pokazZdjecie,
                [classes.brakZdjecia]: !pokazZdjecie,
              })}
            >
              {!pokazZdjecie && <PhotoCameraIcon />}
            </div>
            <div>
              <TextField label="Uwagi" value={uwagi} onChange={onUwagiChange} fullWidth />
            </div>
            <Autocomplete
              multiple
              limitTags={2}
              options={EditDishHelper.dajNieWybraneTagi(tagi, wybraneTagi)}
              getOptionLabel={(tag) => tag.nazwa}
              value={wybraneTagi}
              onChange={onTagiChange}
              renderInput={(params) => (
                <TextField {...params} label="Tagi" placeholder="Obiad" onKeyDown={onTagiInputKeyDown} />
              )}
            />
            <div>
              <TextField label="Link do przepisu" value={linkDoPrzepisu} onChange={onLinkDoPrzepisuChange} fullWidth />
            </div>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={onAnulujClick}>Anuluj</Button>
          <Button onClick={onDodajClick}>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDish;
