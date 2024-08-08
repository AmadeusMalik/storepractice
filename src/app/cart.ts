import { Image } from "./products";
export interface Cart {
  id: number,
  name: string,
  category: string,
  price: number,
  image: Image
  total:number
  qnt: number
}
