import React from "react";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Tag from "../../../interfaces/Tag";
import Potrawa from "../../../interfaces/Potrawa";
import FoodHelper from "../FoodHelper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(2),
      display: "flex",
      "& > div": {
        flexGrow: 1,
      },
      "& > div:first-child": {
        marginRight: theme.spacing(2),
      },
    },
  }),
);

interface Props {
  potrawy: Potrawa[];
  filtrNazwaState: [string, React.Dispatch<React.SetStateAction<string>>];
  filtrTagiState: [Tag[], React.Dispatch<React.SetStateAction<Tag[]>>];
}

const Filtry: React.FC<Props> = ({
  potrawy,
  filtrNazwaState: [filtrNazwa, setFiltrNazwa],
  filtrTagiState: [filtrTagi, setFiltrTagi],
}) => {
  const classes = useStyles();

  const onFiltrTagiChange = (event: any, values: Tag[]) => {
    setFiltrTagi(values);
  };

  const onFiltrNazweChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltrNazwa(event.target.value);
  };
  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        label="Nazwa potrawy"
        placeholder="Sernik"
        value={filtrNazwa}
        onChange={onFiltrNazweChange}
      />
      <Autocomplete
        multiple
        options={FoodHelper.dajTagiDoWyszukiwania(potrawy)}
        getOptionLabel={(potrawa) => potrawa.nazwa}
        filterSelectedOptions
        limitTags={3}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Tagi" placeholder="Obiad" />}
        onChange={onFiltrTagiChange}
      />
    </div>
  );
};

export default Filtry;
