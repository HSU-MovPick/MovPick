import { ImageBackground, StyleSheet, Text } from 'react-native';
import MovieCardPNG from '../../assets/movie-card.png';
export default function MovieCard({ movieTitle, movieCategory, movieReleaseDate }) {
  
  return (
    // 이미지 배경 + 텍스트 배치
    <ImageBackground 
      source={MovieCardPNG} 
      style={styles.card} // 이미지 크기와 텍스트 배치
      imageStyle={styles.imageStyle} // 이미지 자체 스타일
    >
      <Text style={styles.title}>{movieTitle}</Text>
      <Text style={styles.category}># {movieCategory}</Text>
      <Text style={styles.releaseDate}># {movieReleaseDate}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270, // 이미지 너비
    // height:430, // 이렇게 하면 안되는데....
    aspectRatio: 0.603, //피그마 기반 비율
    borderRadius: 15, 
    overflow: 'hidden', // 테두리 밖 내용 숨김
    justifyContent: 'flex-end', // 텍스트를 하단에 배치
    padding: 40, // 텍스트에 줄 여백
    transform: [{ rotate: '5deg' }], // 5도 회전
    backgroundColor:'green',

  },
  imageStyle: {
    resizeMode: 'cover', // 이미지 비율 유지하며 채우기
    backgroundColor:'blue',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    // backgroundColor:'red',
  },
  category: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  releaseDate: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
