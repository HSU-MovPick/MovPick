import { Image, StyleSheet, Text } from 'react-native';
import MovieCardPNG from '../../assets/movie-card.png';

export default function MovieCard({movieTitle, movieCategory, movieReleaseDate}) {

  return (
    <>
    <Image source={MovieCardPNG} style={styles.image} />
    <Text style={styles.title}> {movieTitle} </Text>
    <Text style={styles.category}> {movieCategory} </Text>
    <Text style={styles.releaseDate}> {movieReleaseDate} </Text>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    position: relative, // 부모 요소로 설정
    width: 300,
    height: 400,
    resizeMode: 'contain',
    transform: [{ rotate: '3deg' }], 
    marginLeft: 10, // 왼쪽 마진
  },

  title:{
    position: absolute, //자식 요소로 설정
    position: 'absolute',
    top: 20, 
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // 그림자
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  }

});
