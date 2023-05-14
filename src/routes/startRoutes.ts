import {GetOrderDTO} from '../providers/order.provider';
import {VisitGetDto} from '../providers/visits.provider';

export enum StartStackRouteNames {
  LoginScreen = 'LoginScreen',
  ProductsScreen = 'ProductScreen',
  CreateVisit = 'CreateVisit',
  VisitDetail = 'VisitDetail',
  CreateOrder = 'CreateOrder',
  Orders = 'Orders',
  OrderDetail = 'OrderDetail',
}

export type StartStackParamList = {
  [StartStackRouteNames.LoginScreen]: undefined;
  [StartStackRouteNames.ProductsScreen]: undefined;
  [StartStackRouteNames.CreateVisit]: undefined;
  [StartStackRouteNames.VisitDetail]: {visit: VisitGetDto};
  [StartStackRouteNames.CreateOrder]: {visitId: string};
  [StartStackRouteNames.Orders]: undefined;
  [StartStackRouteNames.OrderDetail]: {order: GetOrderDTO};
};
