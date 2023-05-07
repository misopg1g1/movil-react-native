import React from 'react';
import {TouchableOpacity} from 'react-native';

export const CameraScreen: React.FC<any> = ({
  children,
  cancelButtonTestID,
  captureButtonTestID,
  onBottomButtonPressed,
}) => {
  return (
    <>
      <TouchableOpacity testID={cancelButtonTestID} />
      <TouchableOpacity
        testID={captureButtonTestID}
        onPress={() =>
          onBottomButtonPressed({
            image: {uri: 'your-image-uri'},
            type: 'capture',
          })
        }
      />
      {children}
    </>
  );
};
