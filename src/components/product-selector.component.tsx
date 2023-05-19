import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Product, useProductContext} from '../context/product.context';
import {SearchHeader} from '../pages/products/products.screen';
import {Language} from '../utils/language.utils';
import {COLOR_CODES} from '../utils/colors';
import ProductItem from './product-selector/product-item.component';

interface ProductSelectorProps {
  setSelectedProducts: (products: (Product & {quantity: number})[]) => void;
  selectedProducts: (Product & {quantity: number})[];
}

export default function ProductSelector(props: ProductSelectorProps) {
  const {products} = useProductContext();
  const [searchPrompt, setSearchPrompt] = useState('');

  const filteredData = products
    .filter(item => {
      return item.stock && item.stock > 0;
    })
    .filter(
      item =>
        item.name.toLowerCase().includes(searchPrompt.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchPrompt.toLowerCase()),
    );

  const renderProduct = (item: Product) => {
    return (
      <ProductItem
        product={item}
        setSelectedProducts={props.setSelectedProducts}
        selectedProducts={props.selectedProducts}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        ListHeaderComponent={
          <>
            <SearchHeader setSearchPrompt={setSearchPrompt} />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                {Language.translate({es: 'Productos', en: 'Products'})}
              </Text>
            </View>
          </>
        }
        ListFooterComponent={<View style={styles.footer} />}
        data={filteredData}
        renderItem={({item}) => renderProduct(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
  },
  searchBarContainer: {
    margin: 20,
  },
  searchTextInput: {
    backgroundColor: COLOR_CODES.LIGHT_GREY,
    height: 36,
    borderRadius: 50,
    padding: 10,
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_CODES.LIGHT_GREY,
    shadowOpacity: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {},
  imageProduct: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  priceContainer: {
    display: 'flex',
    width: 66,
  },
  textName: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 8,
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
  },
  stockText: {marginTop: 12},
  headerContainer: {marginHorizontal: 20, marginBottom: 10},
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  footer: {
    marginBottom: 20,
  },
});
