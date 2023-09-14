import {create} from 'zustand';
import {shallow} from 'zustand/shallow';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export type ProductInBasket = {
  product: Product;
  quantity: number;
};

export interface ProductStore {
  productsInBasket: Array<ProductInBasket>;
  actions: {
    addProductToBasket: (val: Product) => void;
  };
}

export const useProductStore = create<ProductStore>((set, get) => ({
  productsInBasket: [],
  actions: {
    addProductToBasket: product =>
      set({
        productsInBasket: [
          ...get().productsInBasket,
          {product: product, quantity: 1},
        ],
      }),
  },
}));

export const useProductActions = () => useProductStore(state => state.actions);

export const useProductsInBasket = () => useProductStore(state => state.productsInBasket, shallow);