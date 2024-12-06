import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

/* 기본 배경 */
const StandardBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/ticket.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default StandardBackground;

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
    marginLeft: 10,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
