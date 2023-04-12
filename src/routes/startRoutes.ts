export enum StartStackRouteNames {
  LoginScreen = 'LoginScreen',
  ProductsScreen = 'ProductScreen',
}

export type StartStackParamList = {
  [StartStackRouteNames.LoginScreen]: undefined;
  [StartStackRouteNames.ProductsScreen]: undefined;
};
