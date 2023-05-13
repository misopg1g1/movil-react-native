import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  StartStackParamList,
  StartStackRouteNames,
} from '../../routes/startRoutes';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomTextInput from '../../components/custom-text-input.component';
import CustomCameraButton from '../../components/custom-camera-button.component';
import {Language} from '../../utils/language.utils';
import {COLOR_CODES} from '../../utils/colors';
import {visitDetailContent} from './visit-detail.content';
import RNFS from 'react-native-fs';
import {useVisitContext} from '../../context/visit.context';
import {useAuthContext} from '../../context/auth.context';
import CustomDatePicker from '../../components/custom-date-picker.component';
import dayjs from 'dayjs';

export default function VisitDetailScreen(props: {
  navigation: NavigationProp<
    StartStackParamList,
    StartStackRouteNames.VisitDetail
  >;
  route: RouteProp<StartStackParamList, StartStackRouteNames.VisitDetail>;
}) {
  const visit = props.route.params.visit;
  const [validness, setValidness] = useState<boolean>(false);
  const [formRequest, setFormRequest] = useState({
    desciption: visit.description,
    img: visit.image_url,
    date: visit.visit_date,
  });
  const {doUpdateVisit} = useVisitContext();
  const {token} = useAuthContext();

  const handleUpdate = () => {
    doUpdateVisit(
      {
        description: formRequest.desciption,
        img_base64_data:
          formRequest.img !== visit.image_url ? formRequest.img : undefined,
        visit_date: formRequest.date,
      },
      visit.id,
      token as string,
    );
    props.navigation.goBack();
  };
  const getImageBase64 = async (path: string) => {
    try {
      const imageData = await RNFS.readFile(path, 'base64');
      setFormRequest({...formRequest, img: imageData});
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <ScrollView style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {`${Language.translate(visitDetailContent.header)} ${visit.id}`}
        </Text>
        <View style={styles.fixDataContainer}>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(visitDetailContent.clientLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>
              {visit.customer.registered_name}
            </Text>
          </View>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(visitDetailContent.dateLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>{visit.visit_date}</Text>
          </View>
          <View style={styles.fixDataRow}>
            <Text style={styles.fixDataPrimary}>
              {`${Language.translate(visitDetailContent.orderLabel)}`}
            </Text>
            <Text style={styles.fixDataSecondary}>{visit.order_id}</Text>
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomDatePicker
          label={Language.translate(visitDetailContent.newDateLabel)}
          date={dayjs(formRequest.date).toDate()}
          onDateChange={newDate => {
            setValidness(true);
            setFormRequest({
              ...formRequest,
              date: dayjs(newDate).format('YYYY-MM-DD'),
            });
          }}
        />
        <CustomCameraButton
          label={Language.translate(visitDetailContent.photoLabel)}
          onCapture={imagePath => {
            setValidness(true);
            getImageBase64(imagePath);
          }}
          uri={formRequest.img}
        />
        <CustomTextInput
          placeholder={Language.translate(
            visitDetailContent.descriptionPlaceholder,
          )}
          label={Language.translate(visitDetailContent.descriptionLabel)}
          validate={value => value !== ''}
          onChangeText={text => {
            if (text !== visit.description) {
              setValidness(text !== '' ? true : false);
            }
            setFormRequest({...formRequest, desciption: text});
          }}
          value={formRequest.desciption}
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
        onPress={handleUpdate}
        testID="login-button"
        disabled={!validness}>
        <Text style={styles.buttonText}>
          {Language.translate(visitDetailContent.updateButton)}
        </Text>
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
  fixDataContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  fixDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    marginVertical: 5,
  },
  fixDataPrimary: {
    textAlign: 'left',
    flex: 1,
  },
  fixDataSecondary: {
    textAlign: 'left',
    flex: 1,
  },
});
