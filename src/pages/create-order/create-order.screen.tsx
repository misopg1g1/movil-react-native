import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  StartStackParamList,
  StartStackRouteNames,
} from '../../routes/startRoutes';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useOrderContext} from '../../context/order.context';
import {useAuthContext} from '../../context/auth.context';
import dayjs from 'dayjs';
import ProductList from '../../components/product-list.component';
import {Product} from '../../context/product.context';
import ProductModal from '../../components/product-modal.component';
import {COLOR_CODES} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Language} from '../../utils/language.utils';
import {createOrderContent} from './create-order.content';

export default function CreateOrderScreen(props: {
  navigation: NavigationProp<
    StartStackParamList,
    StartStackRouteNames.CreateOrder
  >;
  route: RouteProp<StartStackParamList, StartStackRouteNames.CreateOrder>;
}) {
  const visitId = props.route.params.visitId;
  const {doCreateOrder} = useOrderContext();
  const {token} = useAuthContext();
  const [selectedProducts, setSelectedProducts] = useState<
    (Product & {quantity: number})[]
  >([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredProducts = selectedProducts.filter(
    product => product.quantity > 0,
  );

  const productQuantity = filteredProducts.length;

  const handleCreateOrder = () => {
    const order = {
      visit_id: visitId,
      items: filteredProducts.map(product => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
      discount: 0,
      delivery_date: dayjs().add(2, 'day').toISOString(),
    };
    doCreateOrder(order, token as string);
    props.navigation.navigate(StartStackRouteNames.Orders);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.root} testID="root-create-order">
      <ProductList
        setModalOn={setShowModal}
        selectedProducts={selectedProducts}
        shouldShowEditProperties
        shouldShowTotalFooter
      />
      {productQuantity > 0 && (
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={handleCreateOrder}
          testID="create-order-button">
          <Text style={styles.buttonText}>
            {Language.translate(createOrderContent.createButton)}
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
        testID="camera-screen">
        <ProductModal
          close={closeModal}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    height: '100%',
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
});
