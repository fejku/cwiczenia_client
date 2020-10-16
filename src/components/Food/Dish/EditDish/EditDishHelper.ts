import Potrawa from "../../../../interfaces/Potrawa";
import Tag from "../../../../interfaces/Tag";

export default class EditDishHelper {
  static isImageExists = (image_url: string) => {
    return new Promise((resolve) => {
      if (image_url) {
        const img = new Image();
        img.src = image_url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      } else {
        resolve(false);
      }
    });
  };

  static dodajNowyTag = async (tagNazwa: string): Promise<Tag[]> => {
    const response = await fetch("/food/tagi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nazwa: tagNazwa }),
    });
    return await response.json();
  };

  static dodajPotrawe = async (dodawanaPotrawa: Potrawa): Promise<Potrawa[]> => {
    const response = await fetch("/food/potrawy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dodawanaPotrawa),
    });
    return await response.json();
  };
}
