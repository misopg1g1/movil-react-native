import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR_CODES} from '../../utils/colors';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  StartStackParamList,
  StartStackRouteNames,
} from '../../routes/startRoutes';
import {Language} from '../../utils/language.utils';
import {orderDetailContent} from './order-detail.content';
import dayjs from 'dayjs';
import ProductList from '../../components/product-list.component';
import {Product, useProductContext} from '../../context/product.context';

export default function OrderDetailScreen(props: {
  navigation: NavigationProp<
    StartStackParamList,
    StartStackRouteNames.OrderDetail
  >;
  route: RouteProp<StartStackParamList, StartStackRouteNames.OrderDetail>;
}) {
  const order = props.route.params.order;
  const {products} = useProductContext();

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text numberOfLines={1} style={styles.headerText}>
          {`${Language.translate(orderDetailContent.header)} ${order.id}`}
        </Text>
        <View style={styles.fixDataContainer}>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(orderDetailContent.clientLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>
              {order.customer.registered_name}
            </Text>
          </View>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(orderDetailContent.dateLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>
              {dayjs(order.delivery_date).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(orderDetailContent.statusLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>{order.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.productListContainer}>
        <ProductList
          selectedProducts={order.items.map(item => {
            const product = products.find(
              currentProduct => currentProduct.id === item.product_id,
            ) as Product;
            return {...product, quantity: item.quantity};
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLOR_CODES.WHITE,
    flex: 1,
  },
  headerContainer: {marginHorizontal: 20, marginBottom: 10, flex: 1},
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  formContainer: {
    marginHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 311,
    backgroundColor: COLOR_CODES.BLUE,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 22.2,
    color: 'white',
  },
  fixDataContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  fixDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    marginVertical: 5,
  },
  fixDataPrimary: {
    textAlign: 'left',
    flex: 1,
  },
  fixDataSecondary: {
    textAlign: 'left',
    flex: 1,
  },
  productListContainer: {flex: 4},
});
