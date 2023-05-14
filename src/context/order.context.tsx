import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Language} from '../utils/language.utils';
import {authContent} from './auth.content';
import {
  CreateOrderDTO,
  GetOrderDTO,
  OrdersProvider,
} from '../providers/order.provider';
import {useVisitContext} from './visit.context';

export interface IOrderContext {
  doGetOrdersFromSeller: (token: string) => Promise<void>;
  doCreateOrder: (visit: CreateOrderDTO, token: string) => Promise<void>;
  orders: GetOrderDTO[];
}

export const OrderContext: React.Context<IOrderContext | undefined> =
  React.createContext<IOrderContext | undefined>(undefined);

export const useOrderContext = (): IOrderContext => {
  const context = React.useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an EventProvider');
  }
  return context;
};

export const OrderProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [orders, setOrders] = useState<GetOrderDTO[]>([]);
  const {doGetVisitsFromSeller} = useVisitContext();

  const doGetOrdersFromSeller = async (token: string) => {
    try {
      const response = await OrdersProvider.getOrdersFromSeller(token);
      if (response.status === 200) {
        const result: GetOrderDTO[] = await response.json();
        setOrders(result);
      } else {
        setOrders([]);
        Alert.alert(Language.translate(authContent.alert));
      }
    } catch (e) {
      Alert.alert(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    }
  };

  const doCreateOrder = async (order: CreateOrderDTO, token: string) => {
    try {
      const response = await OrdersProvider.createOrder(order, token);
      if (response.status === 200) {
        doGetOrdersFromSeller(token);
        doGetVisitsFromSeller(token);
      } else {
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
    <OrderContext.Provider
      value={{
        orders,
        doGetOrdersFromSeller,
        doCreateOrder,
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};
