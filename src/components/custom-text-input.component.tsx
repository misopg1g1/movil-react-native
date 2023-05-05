import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  label: string;
  iconName?: string;
  validate?: (value: string) => boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  label,
  iconName,
  onChangeText,
  value,
  validate,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
    if (validate) {
      setIsError(!validate(text));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          isError ? styles.inputWrapperError : null,
        ]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={value}
        />
        {iconName && <Icon name={iconName} size={24} style={styles.icon} />}
      </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginLeft: 8,
    color: '#999',
  },
  inputWrapperError: {
    borderColor: 'red',
  },
});

export default CustomTextInput;
