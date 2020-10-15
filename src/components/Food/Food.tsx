import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Dish from "./Dish/Dish";
import { Autocomplete } from "@material-ui/lab";
import Potrawa from "../../interfaces/Potrawa";
import FoodHelper from "./FoodHelper";
import Tag from "../../interfaces/Tag";
import { useStyles } from "./FoodStyle";

interface Props {}

const Food = (props: Props) => {
  const classes = useStyles();

  const [potrawy, setPotrawy] = useState<Potrawa[]>([]);
  const [przefiltrowanePotrawy, setPrzefiltrowanePotrawy] = useState<Potrawa[]>([]);
  const [filtrTagi, setFiltrTagi] = useState<Tag[]>([]);
  const [filtrNazwa, setFiltrNazwa] = useState("");

  useEffect(() => {
    pobierzPotrawy();
  }, []);

  useEffect(() => {
    ustawPrzefiltrowanePotrawy();
  }, [potrawy, filtrTagi, filtrNazwa]); // eslint-disable-line react-hooks/exhaustive-deps

  const pobierzPotrawy = async () => {
    const response = await fetch("/potrawy");
    const data = await response.json();

    setPotrawy(data);
  };

  const onFiltrTagiChange = (event: any, values: Tag[]) => {
    setFiltrTagi(values);
  };

  const onFiltrNazweChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltrNazwa(event.target.value);
  };

  const ustawPrzefiltrowanePotrawy = () => {
    setPrzefiltrowanePotrawy(FoodHelper.dajPrzefiltrowanePotrawy(potrawy, filtrNazwa, filtrTagi));
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <TextField
          className={classes.wyszukajNazwa}
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
      <div className={classes.dishes}>
        {przefiltrowanePotrawy.map((potrawa) => (
          <Dish key={potrawa._id} potrawa={potrawa} />
        ))}
      </div>
    </div>
  );
};

export default Food;
