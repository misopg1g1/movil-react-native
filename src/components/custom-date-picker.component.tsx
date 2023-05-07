import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
  label: string;
  iconName?: string;
  date: Date;
  onDateChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  iconName,
  date,
  onDateChange,
  mode = 'date',
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDateChange = (selectedDate: Date) => {
    onDateChange(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.datePickerWrapper} onPress={openModal}>
        <Text style={styles.dateText}>{dayjs(date).format('DD/MM/YYYY')}</Text>
        {iconName && <Icon name={iconName} size={24} style={styles.icon} />}
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={closeModal}
          activeOpacity={1}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              date={date}
              onDateChange={handleDateChange}
              mode={mode}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  datePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    borderColor: '#ccc',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginLeft: 8,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 32,
  },
});

export default CustomDatePicker;
