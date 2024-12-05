import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ResultMessage({ UserName, MovieTitle }) {
  return (
    <View style={styles.container}>
      {/* 왼쪽 텍스트 섹션 */}
      <View style={styles.textSection}>
        <Text style={styles.userName}>
          '{UserName}'님이 궁금해하시는
        </Text>
        <Text style={styles.movieTitle}>
          영화 제목은
        </Text>
        <Text style={styles.movieTitleHighlight}>
          {MovieTitle} <Text style={styles.movieTitle}>입니다.</Text>
        </Text>
      </View>

      {/* 오른쪽 이미지 섹션 */}
      <Image
        source={require('../../../assets/mimoticon/result-mimoticon.png')} // 실제 파일 경로로 수정
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:190,
    marginBlockStart:-50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
  },
  textSection: {
    marginLeft:50,
    width:190,
    marginRight: -20, // 이미지와 텍스트 간의 간격
  },
  userName: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontWeight: '600', // 600 적용
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // 그림자 색상
    textShadowOffset: { width: 0, height: 4 }, // 그림자 오프셋
    textShadowRadius: 4, // 그림자 반경
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 15, 
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    marginBottom: 5,
  },
  movieTitleHighlight: {
    fontSize: 25, 
    color: '#F3F3F3',
    fontFamily: 'Pretendard',
    fontWeight: '700', // 굵기 700
    marginBottom: 5,
  },
  image: {
    width: 150, // 이미지 크기
    height: 150,
  },
});
