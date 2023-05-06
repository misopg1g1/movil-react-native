import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CameraScreen} from 'react-native-camera-kit';
import {COLOR_CODES} from '../utils/colors';

interface CustomCameraButtonProps {
  label: string;
  iconName?: string;
  onCapture: (imagePath: string) => void;
}

const CustomCameraButton: React.FC<CustomCameraButtonProps> = ({
  label,
  onCapture,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined,
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCapture = (event: {image: {uri: string}}) => {
    onCapture(event.image.uri);
    setCurrentImage(event.image.uri);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.cameraButtonWrapper} onPress={openModal}>
        {currentImage ? (
          <Image
            resizeMode="cover"
            source={{uri: currentImage}}
            style={styles.preview}
          />
        ) : (
          <View style={styles.placeHolder}>
            <Icon name={'image'} size={40} color={COLOR_CODES.STEELGREY} />
            <Text style={styles.placeHolderPrimaryText}>Agregar Imagen</Text>
            <Text style={styles.placeHolderSecondaryText}>
              Click para seleccionar una imagen
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <CameraScreen
          actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
          onBottomButtonPressed={event => {
            if (event.type === 'capture') {
              handleCapture(event);
            } else {
              closeModal();
            }
          }}
          captureButtonImage={require('../../assets/images/camera.png')}
        />
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
  cameraButtonWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    width: 234,
    height: 117,
    //shadow
    shadowColor: COLOR_CODES.DARK_BLUE,
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  icon: {
    color: '#999',
  },
  preview: {
    width: 234,
    height: 117,
    borderRadius: 8,
  },
  placeHolder: {
    width: 234,
    height: 117,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeHolderPrimaryText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: COLOR_CODES.STEELGREY,
  },
  placeHolderSecondaryText: {
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 13.5,
    color: COLOR_CODES.STEELGREY,
  },
});

export default CustomCameraButton;
