import Tag from "./Tag";

interface Potrawa {
  _id?: string;
  nazwa: string;
  zdjecie?: string;
  uwagi?: string;
  link?: string;
  tagi: Tag[];
}

export default Potrawa;
