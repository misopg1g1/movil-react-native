/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Product} from '../context/product.context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_CODES} from '../utils/colors';
import {FlatList} from 'react-native-gesture-handler';
import {Language} from '../utils/language.utils';
import {productListContent} from './product-list.content';

interface ProductListProps {
  selectedProducts: (Product & {quantity: number})[];
  setModalOn?: (state: boolean) => void;
  shouldShowEditProperties?: boolean;
  shouldShowTotalFooter?: boolean;
}
export default function ProductList(props: ProductListProps) {
  const filteredProducts = props.selectedProducts.filter(
    product => product.quantity > 0,
  );

  const renderProductList = (item: Product & {quantity: number}) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.img_url}} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text numberOfLines={1} lineBreakMode="tail" style={styles.nameText}>
            {item.sku}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.nameText}>{item.quantity}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.nameText}>
            {Language.toCurrency(item.quantity * item.price)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Productos</Text>
        {props.shouldShowEditProperties && (
          <Icon
            onPress={() => props.setModalOn && props.setModalOn(true)}
            name={'plus-circle'}
            size={20}
            color={COLOR_CODES.STEELGREY}
          />
        )}
      </View>
      {filteredProducts.length > 0 ? (
        <View>
          <FlatList
            data={filteredProducts}
            renderItem={({item}) => renderProductList(item)}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <View style={[styles.listColumn, {flex: 4}]}>
                  <Text style={styles.nameText}>
                    {Language.translate(productListContent.listHeader.product)}
                  </Text>
                </View>
                <View style={styles.listColumn}>
                  <Text style={styles.nameText}>
                    {Language.translate(productListContent.listHeader.quantity)}
                  </Text>
                </View>
                <View style={styles.listColumn}>
                  <Text style={styles.nameText}>
                    {Language.translate(productListContent.listHeader.price)}
                  </Text>
                </View>
              </View>
            }
            ListFooterComponent={
              <View style={styles.footerContainer}>
                <View style={styles.footerRow}>
                  <Text style={styles.nameText}>
                    {Language.translate(productListContent.footer.order)}
                  </Text>
                  <Text style={styles.nameText}>
                    {Language.toCurrency(
                      filteredProducts
                        .map(product => {
                          return product.quantity * product.price;
                        })
                        .reduce((prev, current) => prev + current),
                    )}
                  </Text>
                </View>
                <View style={styles.footerRow}>
                  <Text style={styles.nameText}>
                    {Language.translate(productListContent.footer.discount)}
                  </Text>
                  <Text style={styles.nameText}>{Language.toCurrency(0)}</Text>
                </View>
                <View style={styles.footerRow}>
                  <Text style={styles.totalText}>
                    {Language.translate(productListContent.footer.total)}
                  </Text>
                  <Text style={styles.totalText}>
                    {Language.toCurrency(
                      filteredProducts
                        .map(product => {
                          return product.quantity * product.price;
                        })
                        .reduce((prev, current) => prev + current),
                    )}
                  </Text>
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <View style={styles.noProductContainer}>
          <Text style={styles.nameText}>
            {Language.translate(productListContent.noProduct)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
  },
  imageContainer: {},
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  quantityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  nameText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14.52,
    textAlign: 'left',
  },
  noProductContainer: {},
  footerContainer: {
    borderTopWidth: 1,
    borderColor: COLOR_CODES.STEELGREY,
    marginTop: 10,
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.52,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  listColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
