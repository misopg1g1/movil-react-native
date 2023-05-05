export enum StartStackRouteNames {
  LoginScreen = 'LoginScreen',
  ProductsScreen = 'ProductScreen',
  CreateVisit = 'CreateVisit',
}

export type StartStackParamList = {
  [StartStackRouteNames.LoginScreen]: undefined;
  [StartStackRouteNames.ProductsScreen]: undefined;
  [StartStackRouteNames.CreateVisit]: undefined;
};
