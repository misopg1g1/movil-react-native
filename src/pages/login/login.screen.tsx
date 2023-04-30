import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {loginContent} from './login.content';
import {StartStackRouteNames} from '../../routes/startRoutes';
import {Language} from '../../utils/language.utils';
import {useAuthContext} from '../../context/auth.context';

export default function LoginScreen(props: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {doLoginIn, token} = useAuthContext();

  const login = async () => {
    setLoading(true);
    await doLoginIn({user, password});
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      props.navigation.navigate(StartStackRouteNames.ProductsScreen);
    }
  }, [token, props.navigation]);

  return (
    <View style={styles.mainContainer}>
      {loading && (
        <View style={styles.maskLoading}>
          <ActivityIndicator shouldRasterizeIOS />
        </View>
      )}
      <View style={styles.topContainer}>
        <Text style={styles.mainTitle}>CCP</Text>
        <Text style={styles.secondaryTitle}>CCP V1.0 System</Text>
        <Text style={styles.introTitle}>
          {Language.translate(loginContent.welcome)}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/images/retail.png')}
        />
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.loginText}>
              {Language.translate(loginContent.sign_in)}
            </Text>
            <Text style={styles.loginPromptText}>
              {Language.translate(loginContent.user_propmt)}
            </Text>
            <TextInput
              placeholder={Language.translate(loginContent.user_placeholder)}
              style={styles.placeholderText}
              placeholderTextColor={'#FFFCFC66'}
              clearButtonMode={'always'}
              textContentType={'username'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={setUser}
            />
            <Text style={styles.loginPromptText}>
              {Language.translate(loginContent.password_propmt)}
            </Text>
            <TextInput
              placeholder={Language.translate(
                loginContent.password_placeholder,
              )}
              placeholderTextColor={'#FFFCFC66'}
              style={styles.placeholderText}
              textContentType={'password'}
              secureTextEntry={true}
              clearButtonMode={'always'}
              onChangeText={setPassword}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => login()}
              testID="login-button">
              <Text style={styles.buttonText}>
                {Language.translate(loginContent.login_button)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  topContainer: {
    width: '100%',
    height: 134,
    backgroundColor: '#2F76E5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontWeight: '800',
    fontSize: 36,
    lineHeight: 43.57,
    color: 'white',
  },
  secondaryTitle: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.36,
    color: 'white',
  },
  introTitle: {
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 29,
    marginTop: 17,
    color: 'white',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  formContainer: {
    zIndex: 2,
    backgroundColor: 'rgba(47, 118, 229, 0.8)',
    width: 325,
    height: 413,
    display: 'flex',
    paddingHorizontal: 21,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  loginText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24.2,
    color: 'black',
    marginBottom: 14,
  },
  loginPromptText: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24.2,
    color: 'black',
    marginTop: 21,
  },
  placeholderText: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24.2,
    color: 'white',
    borderBottomColor: '#0D0C0C',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    width: 280,
    backgroundColor: '#003459',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 22.2,
    color: 'white',
  },
  maskLoading: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
