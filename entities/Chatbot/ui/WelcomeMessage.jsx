import React from 'react';
import { View, Image, StyleSheet } from 'react-native'; // React Native 컴포넌트와 스타일시트 가져오기

export default function WelcomeMessage() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/chatbot/chatbot-info.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBlockStart:-50,
    width: 330,
    height: 120,
    // flex: 1, -> 이걸 없애줘야 명시적 width, height가 먹힘
    justifyContent: 'center', // 세로축 중앙 정렬
    alignItems: 'center',    // 가로축 중앙 정렬
  },
  image: {
    width: 300, // 이미지 너비 (조정 가능)
    resizeMode: 'contain', // 이미지 비율 유지하며 크기 조정
  },
});
