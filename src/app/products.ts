export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
export interface Products {
    name: string,
    category: string,
    price: number,
    image: Image
}
