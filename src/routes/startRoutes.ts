import {VisitGetDto} from '../providers/visits.provider';

export enum StartStackRouteNames {
  LoginScreen = 'LoginScreen',
  ProductsScreen = 'ProductScreen',
  CreateVisit = 'CreateVisit',
  VisitDetail = 'VisitDetail',
}

export type StartStackParamList = {
  [StartStackRouteNames.LoginScreen]: undefined;
  [StartStackRouteNames.ProductsScreen]: undefined;
  [StartStackRouteNames.CreateVisit]: undefined;
  [StartStackRouteNames.VisitDetail]: {visit: VisitGetDto};
};
