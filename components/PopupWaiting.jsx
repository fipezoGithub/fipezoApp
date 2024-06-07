import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {vw, vh} from 'react-native-viewport-units';

const PopupWaiting = ({isWaiting, setIsWaiting}) => {
  return (
    <Modal
      transparent={true}
      visible={isWaiting}
      onRequestClose={() => setIsWaiting(false)}>
      <View
        className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.72)]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.72)'}}>
        <View className="flex gap-y-4">
          <ActivityIndicator animating={true} color="#FE7A36" size="large" />
          <Text style={{fontSize: 4 * vw}} className="text-white font-bold">
            Please wait while we ready your data
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default PopupWaiting;

const styles = StyleSheet.create({});
