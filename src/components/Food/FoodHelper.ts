import Potrawa from "../../interfaces/Potrawa";
import Tag from "../../interfaces/Tag";

export default class FoodHelper {
  public static dajTagiDoWyszukiwania = (potrawy: Potrawa[]) => {
    const result: Tag[] = [];
    for (let i = 0; i < potrawy.length; i++) {
      const potrawa = potrawy[i];
      for (let j = 0; j < potrawa.tagi.length; j++) {
        const tag = potrawa.tagi[j];
        const czyTagNaLiscie = result.some((r) => r._id === tag._id);

        if (!czyTagNaLiscie) {
          result.push(tag);
        }
      }
    }
    return result;
  };

  public static dajPotrawyPasujaceDoTagow = (potrawy: Potrawa[], filtTagi: Tag[]) => {
    const result: Potrawa[] = [];
    for (let i = 0; i < potrawy.length; i++) {
      const potrawa = potrawy[i];
      for (let j = 0; j < potrawa.tagi.length; j++) {
        const tag = potrawa.tagi[j];
        const czyPasuje = filtTagi.map((filtTag) => filtTag.nazwa).includes(tag.nazwa);

        if (czyPasuje) {
          result.push(potrawa);
          break;
        }
      }
    }
    return result;
  };

  static dajPrzefiltrowanePotrawy = (potrawy: Potrawa[], filtrNazwa: string, filtrTagi: Tag[]) => {
    let result = [...potrawy];

    if (filtrNazwa) {
      result = result.filter((potrawa) => potrawa.nazwa.toLowerCase().includes(filtrNazwa.toLowerCase()));
    }

    if (filtrTagi.length > 0) {
      result = FoodHelper.dajPotrawyPasujaceDoTagow(result, filtrTagi);
    }

    return result;
  };
}
