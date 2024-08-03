import { Image } from "./products";
export interface Cart {
  name: string,
  category: string,
  price: number,
  image: Image
  quantity: number
}
