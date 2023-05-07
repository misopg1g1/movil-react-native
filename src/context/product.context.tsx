import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Language} from '../utils/language.utils';
import {authContent} from './auth.content';
import {ProductsProvider} from '../providers/products.provider';

enum ProductType {
  PERISHABLE = 'PERISHABLE',
  NONPERISHABLE = 'NONPERISHABLE',
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  array: number[];
  type: ProductType[];
  temperature_control: number;
  expiration_date: string;
  fragility_conditions: string;
  description: string;
  status: boolean;
  price: number;
  img_url: string;
  suppliers: string;
  category: {};
  stock: number;
}

export interface IProductContext {
  doGetAllProducts: (token: string) => Promise<void>;
  products: Product[];
}

export const ProductContext: React.Context<IProductContext | undefined> =
  React.createContext<IProductContext | undefined>(undefined);

export const useProductContext = (): IProductContext => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within an EventProvider');
  }
  return context;
};

export const ProductProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);

  const doGetAllProducts = async (token: string) => {
    try {
      const response = await ProductsProvider.getAllProducts(token);
      console.log(response);
      if (response.status === 200) {
        const result: Product[] = await response.json();
        setProducts(result);
      } else {
        setProducts([]);
        Alert.alert(Language.translate(authContent.alert));
      }
    } catch (e) {
      Alert.alert(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        doGetAllProducts,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};
