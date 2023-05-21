import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Product} from '../../context/product.context';
import {Language} from '../../utils/language.utils';
import {COLOR_CODES} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProductItemProps {
  product: Product;
  setSelectedProducts: (products: (Product & {quantity: number})[]) => void;
  selectedProducts: (Product & {quantity: number})[];
  index?: number;
}
export default function ProductItem(props: ProductItemProps) {
  const item = props.product;
  const [counter, setCounter] = useState(
    props.selectedProducts.find(product => product.id === item.id)?.quantity ||
      0,
  );

  useEffect(() => {
    props.setSelectedProducts([
      ...props.selectedProducts.filter(product => product.id !== item.id),
      {...item, quantity: counter},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const handleIncreaseCounter = () => {
    if (item.stock > counter) {
      setCounter(counter + 1);
    }
  };

  const handleDecreaseCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  console.log(props.index, `plus-item-${props.index}`);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageProduct} source={{uri: item.img_url}} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={styles.textName}>
          {item.name}
        </Text>
      </View>
      <View style={styles.counterContainer}>
        <Icon
          onPress={handleDecreaseCounter}
          testID="minus"
          name={'minus'}
          size={26}
          color={COLOR_CODES.STEELGREY}
        />
        <Text style={styles.textName}>{counter}</Text>
        <Icon
          onPress={handleIncreaseCounter}
          testID={`plus-item-${props.index?.toString()}`}
          name={'plus'}
          size={26}
          color={COLOR_CODES.STEELGREY}
        />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.description}>
          {Language.toCurrency(item.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    marginHorizontal: 20,
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
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
  },
  stockText: {marginTop: 12},
  headerContainer: {marginHorizontal: 20, marginBottom: 10},
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
