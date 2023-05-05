import {Picker, PickerIOS} from '@react-native-picker/picker';
import {ItemValue} from '@react-native-picker/picker/typings/Picker';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomPickerProps {
  label: string;
  iconName?: string;
  items: {label: string; value: string}[];
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
  setValidFunc: (isValid: boolean) => void;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  iconName,
  items,
  selectedValue,
  onValueChange,
  setValidFunc,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValueChange = (value: ItemValue) => {
    if (onValueChange) {
      onValueChange(String(value));
    }
    setIsError(value === '');
  };

  useEffect(() => {
    setValidFunc(!isError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.pickerWrapper,
          isError ? styles.pickerWrapperError : null,
        ]}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          numberOfLines={1}>
          <Picker.Item label="Selecciona una opción" value="" />
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
        {iconName && <Icon name={iconName} size={24} style={styles.icon} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    borderColor: '#ccc',
  },
  picker: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginLeft: 8,
    color: '#999',
  },
  pickerWrapperError: {
    borderColor: 'red',
  },
});

export default CustomPicker;
