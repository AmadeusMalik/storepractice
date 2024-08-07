export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
export interface Products {
  id:number
    name: string,
    category: string,
    price: number,
    qnt:number,
    image: Image
}
