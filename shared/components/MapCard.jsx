import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native';
import MapCardPNG from '../../assets/map-bg.png';

export default function MapCard() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={MapCardPNG} 
          style={styles.card}
          imageStyle={styles.imageStyle}
        >
        </ImageBackground>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      width: 320, // 카드 너비
      justifyContent: 'flex-start',
      aspectRatio: 0.4536, // 비율 유지
      borderRadius: 25.4, // 모서리 둥글게
      overflow: 'hidden', // 내용 넘침 숨김
      justifyContent: 'flex-end', // 내용을 아래쪽으로 정렬
      padding: 40 // 내부 패딩
    }
});
