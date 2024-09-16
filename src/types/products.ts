export type TProducts = {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max: number;
  isLisked?: boolean;
  isAuthantication?: boolean;
};
