import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR_CODES} from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductSelector from './product-selector.component';
import {Product} from '../context/product.context';

interface ProductModalProps {
  close: () => void;
  setSelectedProducts: (products: (Product & {quantity: number})[]) => void;
  selectedProducts: (Product & {quantity: number})[];
}

export default function ProductModal(props: ProductModalProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.headerContainer}>
        <Icon
          onPress={props.close}
          name={'close-circle'}
          size={26}
          color={COLOR_CODES.STEELGREY}
        />
      </View>
      <ProductSelector
        setSelectedProducts={props.setSelectedProducts}
        selectedProducts={props.selectedProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '40%',
    backgroundColor: COLOR_CODES.WHITE,
    marginVertical: '60%',
    marginHorizontal: 20,
    //shadow
    shadowColor: COLOR_CODES.DARK_BLUE,
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    borderRadius: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%',
    right: 10,
    top: 10,
    zIndex: 10,
  },
});
