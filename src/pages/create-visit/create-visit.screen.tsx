import {View, Text, StyleSheet, DatePickerIOSBase} from 'react-native';
import React, {useState} from 'react';
import {Language} from '../../utils/language.utils';
import {createVisitContent} from './create-visit.content';
import {COLOR_CODES} from '../../utils/colors';
import CustomTextInput from '../../components/custom-text-input.component';
import CustomPicker from '../../components/custom-picker.component';
import DatePicker from 'react-native-date-picker';
import CustomDatePicker from '../../components/custom-date-picker.component';

export default function CreateVisitScreen() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [validnessObject, setValidnessObject] = useState({
    client: false,
  });

  console.log(validnessObject);
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {Language.translate(createVisitContent.header)}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CustomPicker
          label={'Cliente'}
          items={[{label: 'Platanitos Col', value: '1'}]}
          selectedValue={selectedValue}
          onValueChange={value => setSelectedValue(value)}
          setValidFunc={(isValid: boolean) => {
            setValidnessObject({...validnessObject, client: isValid});
          }}
        />
        <CustomTextInput
          placeholder="Escribir Descripción"
          label="Descripción"
          validate={() => true}
        />
        <CustomDatePicker
          label="Fecha"
          date={new Date()}
          onDateChange={() => {}}
        />
      </View>
    </View>
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
  },
});
