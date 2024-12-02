import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMap = ({ center = { lat: 37.5, lng: 127.0 }, zoom = 16 }) => {
  const calculateDelta = (zoom) => {
    // Google Maps의 zoom 수준을 React Native Maps의 latitudeDelta, longitudeDelta로 변환 (임의 계산)
    const delta = Math.pow(2, -(zoom - 10));
    return { latitudeDelta: delta, longitudeDelta: delta };
  };

  const region = {
    latitude: center.lat,
    longitude: center.lng,
    ...calculateDelta(zoom),
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{ latitude: center.lat, longitude: center.lng }}
          title="현재 위치"
          description="이곳이 표시됩니다."
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // 지도 크기를 부모 컨테이너에 맞게 조정
  },
});

export default GoogleMap;
