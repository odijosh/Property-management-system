// export interface Property {
//   title: string;
//   propertyType: string;
//   rooms: string;
//   kitchen: string;
//   toilet: string;
//   bathroom: string;
//   state: string;
//   lga: string;
//   country: string;
//   amount: string;
//   description: string;
//   imageUrl: string;
// }

export interface Property {
  title: string;
  propertyType: string;
  rooms: number;
  kitchen: number;
  toilet: number;
  bathroom: number;
  state: string;
  lga: string;
  country: string;
  amount: number;
  description: string;

  // ✅ ADD THESE (THIS FIXES YOUR ERROR)
  image1?: string;
  image2?: string;
  image3?: string;
}
