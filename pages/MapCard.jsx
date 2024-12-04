// assets/map-bg.png 파일을 배경으로 렌더링할 MapCard 컴포넌트 정의
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const MapCard = () => {
  return (
    <Image
      source={require('../assets/map-bg.png')}
      style={styles.backgroundImage}
      resizeMode="cover" // 배경 크기에 맞게 조정
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default MapCard;
