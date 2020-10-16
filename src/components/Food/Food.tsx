import React, { useEffect, useState } from "react";
import Dish from "./Dish/Dish";
import Filtry from "./Filtry/Filtry";
import FoodHelper from "./FoodHelper";
import Potrawa from "../../interfaces/Potrawa";
import Tag from "../../interfaces/Tag";
import { useStyles } from "./FoodStyle";
import EditDish from "./Dish/EditDish/EditDish";

interface Props {}

const Food = (props: Props) => {
  const classes = useStyles();

  const [potrawy, setPotrawy] = useState<Potrawa[]>([]);
  const [przefiltrowanePotrawy, setPrzefiltrowanePotrawy] = useState<Potrawa[]>([]);
  const [filtrNazwa, setFiltrNazwa] = useState("");
  const [filtrTagi, setFiltrTagi] = useState<Tag[]>([]);

  useEffect(() => {
    pobierzPotrawy();
  }, []);

  useEffect(() => {
    ustawPrzefiltrowanePotrawy();
  }, [potrawy, filtrNazwa, filtrTagi]); // eslint-disable-line react-hooks/exhaustive-deps

  const pobierzPotrawy = async () => {
    const response = await fetch("/food/potrawy");
    const data = await response.json();
    setPotrawy(data);
  };

  const ustawPrzefiltrowanePotrawy = () => {
    setPrzefiltrowanePotrawy(FoodHelper.dajPrzefiltrowanePotrawy(potrawy, filtrNazwa, filtrTagi));
  };

  return (
    <div className={classes.root}>
      <Filtry
        potrawy={potrawy}
        filtrNazwaState={[filtrNazwa, setFiltrNazwa]}
        filtrTagiState={[filtrTagi, setFiltrTagi]}
      />
      <div className={classes.dishes}>
        {przefiltrowanePotrawy.map((potrawa) => (
          <Dish key={potrawa._id} potrawa={potrawa} />
        ))}
      </div>
      <EditDish setPotrawy={setPotrawy} />
    </div>
  );
};

export default Food;
