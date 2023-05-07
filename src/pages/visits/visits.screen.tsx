import React, {useState, useCallback} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {COLOR_CODES} from '../../utils/colors';
import {Language} from '../../utils/language.utils';
import {visitsContent} from './visits.content';
import {Visit} from '../../context/visit.context';
import dayjs from 'dayjs';
import {FloatingActionButton} from '../../components/floatinActionButton.component';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  StartStackParamList,
  StartStackRouteNames,
} from '../../routes/startRoutes';

const data: Visit[] = [
  {
    id: '1',
    cliente: 'Platanitos Col',
    fecha: new Date(2023, 4, 5).toISOString(),
  },
  {
    id: '2',
    cliente: 'El man abarrotero',
    fecha: new Date(2023, 4, 6).toISOString(),
  },
  {
    id: '3',
    cliente: 'Comercial Suculenta',
    fecha: new Date(2023, 4, 7).toISOString(),
  },
];

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
        placeholder={Language.translate(visitsContent.searchPlaceholder)}
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
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const navigation = useNavigation<NavigationProp<StartStackParamList>>();

  const filteredData = data.filter(item =>
    item.cliente.toLowerCase().includes(searchPrompt.toLowerCase()),
  );

  const renderProduct = (item: Visit) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textName}>{item.id}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textName} numberOfLines={2} lineBreakMode="tail">
            {item.cliente}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textName}>
            {dayjs(item.fecha).format('DD/MM/YYYY')}
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
                {Language.translate(visitsContent.header)}
              </Text>
            </View>
            <View style={styles.tableHeader}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.tableHeaderText}>
                  {Language.translate(visitsContent.table.id)}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.tableHeaderText}>
                  {Language.translate(visitsContent.table.cliente)}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.tableHeaderText}>
                  {Language.translate(visitsContent.table.fecha)}
                </Text>
              </View>
            </View>
          </>
        }
        data={filteredData}
        renderItem={({item}) => renderProduct(item)}
        keyExtractor={item => item.id}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate(StartStackRouteNames.CreateVisit)}
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
    borderBottomWidth: 1,
    borderBottomColor: COLOR_CODES.LIGHT_GREY,
    shadowOpacity: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  imageContainer: {},
  imageProduct: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    marginHorizontal: 5,
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
    textAlign: 'left',
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
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'left',
  },
});
