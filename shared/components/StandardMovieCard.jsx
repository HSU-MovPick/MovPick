import { Image, ImageBackground, StyleSheet, Text } from 'react-native';
import MovieCardPNG from '../../assets/movie-card.png';
import MovieDefaultImg from '../../assets/movie-default.png';

export default function StandardMovieCard({ moviePoster, movieTitle, movieCategory, movieReleaseDate }) {
  // moviePoster가 null인지 확인하여 이미지 소스를 결정합니다.
  const imageSource = moviePoster ? { uri: moviePoster } : MovieDefaultImg;

  return (
    <ImageBackground 
      source={MovieCardPNG} 
      style={styles.card}
      imageStyle={styles.imageStyle}
    >
      {/* 결정된 이미지 소스를 사용합니다 */}
      <Image source={imageSource} style={styles.moviePoster} /> 
      <Text style={styles.title}>{movieTitle}</Text>
      <Text style={styles.category}># {movieCategory}</Text>
      <Text style={styles.releaseDate}># {movieReleaseDate}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 265,
    aspectRatio: 0.603,
    borderRadius: 15, 
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 40,
    transform: [{ rotate: '5deg' }],
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  moviePoster: { 
    width: 184,
    height: 230,
    borderRadius: 20,
    marginLeft: 5,
    marginBottom: 62,
    resizeMode: 'cover',
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
