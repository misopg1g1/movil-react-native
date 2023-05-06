import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Language} from '../../utils/language.utils';
import {createVisitContent} from './create-visit.content';
import {COLOR_CODES} from '../../utils/colors';
import CustomTextInput from '../../components/custom-text-input.component';
import CustomPicker from '../../components/custom-picker.component';
import CustomDatePicker from '../../components/custom-date-picker.component';
import CustomCameraButton from '../../components/custom-camera-button.component';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import {useAuthContext} from '../../context/auth.context';

export default function CreateVisitScreen() {
  const [validness, setValidness] = useState<boolean>(false);
  const {userClients} = useAuthContext();
  const [formRequest, setFormRequest] = useState({
    client: '',
    desciption: '',
    date: new Date(),
    img: '',
  });

  const getImageBase64 = async (path: string) => {
    try {
      const imageData = await RNFS.readFile(path, 'base64');
      setFormRequest({...formRequest, img: imageData});
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const result = Object.values(formRequest).every(value => {
      if (typeof value === 'string') {
        return value !== '';
      } else {
        return true;
      }
    });
    setValidness(result);
  }, [formRequest]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {Language.translate(createVisitContent.header)}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CustomPicker
          label={'Cliente'}
          items={userClients.map(client => ({
            value: client.id,
            label: client.registered_name,
          }))}
          selectedValue={formRequest.client}
          onValueChange={value =>
            setFormRequest({...formRequest, client: value})
          }
        />
        <CustomTextInput
          placeholder="Escribir Descripción"
          label="Descripción"
          validate={value => value !== ''}
          onChangeText={text =>
            setFormRequest({...formRequest, desciption: text})
          }
        />
        <CustomDatePicker
          label="Fecha"
          date={formRequest.date}
          onDateChange={newDate => {
            setFormRequest({...formRequest, date: newDate});
          }}
        />
        <CustomCameraButton
          label={'Foto'}
          onCapture={imagePath => {
            getImageBase64(imagePath);
          }}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: !validness
              ? COLOR_CODES.LIGHT_GREY
              : COLOR_CODES.BLUE,
          },
        ]}
        onPress={() => console.log('click')}
        testID="login-button"
        disabled={!validness}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR_CODES.WHITE,
  },
  headerContainer: {marginHorizontal: 20, marginBottom: 10},
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
});
