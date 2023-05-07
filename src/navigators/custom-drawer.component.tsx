import {View, Text, StyleSheet} from 'react-native';
import * as React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthContext} from '../context/auth.context';
import {COLOR_CODES} from '../utils/colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Language} from '../utils/language.utils';
import {authStackContent} from './authenticated.content';

interface DrawerCustomProps {
  label: string;
  route: string;
  iconName: string;
}

const DrawerCustomItem = (
  props: DrawerCustomProps & DrawerContentComponentProps,
) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const descriptorKey = Object.keys(props.descriptors).find(descriptorName =>
    descriptorName.startsWith(props.route),
  );
  const labelFromDescriptor =
    props.descriptors[descriptorKey || ''].options.drawerLabel;

  return (
    <DrawerItem
      label={labelFromDescriptor || props.label}
      onPress={() => navigation.navigate(props.route)}
      // eslint-disable-next-line react/no-unstable-nested-components
      icon={() => (
        <Icon name={props.iconName} size={29} color={COLOR_CODES.WHITE} />
      )}
      labelStyle={styles.labelText}
      style={styles.drawerItem}
    />
  );
};

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {user, doLogout} = useAuthContext();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentDrawerStyle}
      style={styles.drawerContainer}
      scrollEnabled={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.primaryTitle}>CCP</Text>
        <Text style={styles.secondaryTitle}>
          {Language.translate(authStackContent.sistemaCcp)}
        </Text>

        <View style={styles.profileContainer}>
          <View style={styles.profileIconContainer}>
            <Icon name="user" size={40} color="white" />
          </View>
          <Text testID="user-name" style={styles.nameText}>
            {user?.user}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <DrawerCustomItem
          label="Products"
          route="Products"
          iconName="inbox"
          {...props}
        />
        <DrawerCustomItem
          label="Orders"
          route="Orders"
          iconName="calculator"
          {...props}
        />
        <DrawerCustomItem
          label="Visits"
          route="Visits"
          iconName="suitcase"
          {...props}
        />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.buttonRow}>
          <Icon
            style={styles.footerIcon}
            name={'gear'}
            size={29}
            color={COLOR_CODES.WHITE}
          />
          <Text testID="settings-text" style={styles.labelText}>
            {Language.translate(authStackContent.settings)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="logout-button"
          style={styles.buttonRow}
          onPress={doLogout}>
          <Icon5
            style={styles.footerIcon}
            name={'logout'}
            size={26}
            color={COLOR_CODES.WHITE}
          />
          <Text testID="logout-text" style={styles.labelText}>
            {Language.translate(authStackContent.logout)}
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: COLOR_CODES.BLUE,
    paddingTop: 25,
    display: 'flex',
  },
  contentDrawerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {},
  listContainer: {
    backgroundColor: COLOR_CODES.DARK_BLUE,
    marginTop: 35,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameText: {
    color: COLOR_CODES.WHITE,
  },
  profileIconContainer: {
    marginTop: 20,
    width: 46,
    height: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLOR_CODES.WHITE,
    borderRadius: 50,
    overflow: 'hidden',
  },
  primaryTitle: {
    color: COLOR_CODES.WHITE,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 43.57,
  },
  secondaryTitle: {
    color: COLOR_CODES.WHITE,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.36,
  },
  labelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.36,
  },
  drawerItem: {
    marginVertical: 25,
  },
  footerContainer: {
    backgroundColor: COLOR_CODES.DARK_BLUE,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 25,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  footerIcon: {
    marginRight: 30,
  },
});
