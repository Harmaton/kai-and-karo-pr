export type Car = {
  _id: string;
  Name: string
  Make: string;
  Model: string;
  Year: string;
  Type: string;
  Description: string;
  Features: string;
  Image: string;
  $vectorize: string;
  $vector: Array<number>;
};

export type SimilarCar = {
  $similarity: number;
} & Car;
