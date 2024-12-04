import React from 'react'
import styled from 'styled-components'
import { View, Image, StyleSheet } from 'react-native'; // React Native 컴포넌트와 스타일시트 가져오기


export default function ChatExample() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/chatbot/chat-example.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width:300,
      height:530,
      justifyContent: 'center', // 세로축 중앙 정렬
      alignItems: 'center',    // 가로축 중앙 정렬
    },
    image: {
      width: 300, // 이미지 너비 (조정 가능)
      resizeMode: 'contain', // 이미지 비율 유지하며 크기 조정
    },
  });
