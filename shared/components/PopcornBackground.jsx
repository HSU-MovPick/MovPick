import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import PopcornTicketImg from '../../assets/popcornticket.png';
import NoResult from '../../assets/noresult.png'

const PopcornBackground = ({ children, isExist}) => {
  return (
    <ImageBackground
      source={!isExist ? NoResult : PopcornTicketImg}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default PopcornBackground;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, // 여백이 생길 때 둥근 모서리로
    overflow: 'hidden', // 모서리 둥글게 자르기
    marginTop: 40, // 위쪽 여백
    marginHorizontal: 15, // 좌우 여백
  },
  overlay: {
    flex: 1
  },
});
