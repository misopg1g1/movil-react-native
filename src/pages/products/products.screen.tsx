import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import {useAuthContext} from '../../context/auth.context';
import {Product, useProductContext} from '../../context/product.context';
import {COLOR_CODES} from '../../utils/colors';
import {Language} from '../../utils/language.utils';
import {RefreshControl} from 'react-native-gesture-handler';
import {productContent} from './products.content';

const SearchHeader = ({
  setSearchPrompt,
}: {
  setSearchPrompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearch = useCallback(
    (text: string) => {
      setSearchPrompt(text);
    },
    [setSearchPrompt],
  );

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        placeholder={Language.translate(productContent.searchPlaceholder)}
        style={styles.searchTextInput}
        clearButtonMode={'always'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default function ProductsScreen() {
  const {token} = useAuthContext();
  const {doGetAllProducts, products} = useProductContext();
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  console.log(products);

  useEffect(() => {
    !!token && doGetAllProducts(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filteredData = products
    .filter(item => {
      return item.stock && item.stock > 0;
    })
    .filter(item =>
      item.name.toLowerCase().includes(searchPrompt.toLowerCase()),
    );

  const onRefresh = async () => {
    setRefreshing(true);
    token && doGetAllProducts(token);
    setRefreshing(false);
  };

  const renderProduct = (item: Product) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageProduct} source={{uri: item.img_url}} />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.description}>
            {Language.toCurrency(item.price)}
          </Text>
          <Text style={styles.stockText}>
            {`${Language.translate(productContent.stockPrefix)} ${item.stock}`}
          </Text>
        </View>
      </View>
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
                {Language.translate(productContent.header)}
              </Text>
            </View>
          </>
        }
        data={filteredData}
        renderItem={({item}) => renderProduct(item)}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_CODES.LIGHT_GREY,
    shadowOpacity: 0,
    marginHorizontal: 25,
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
});
