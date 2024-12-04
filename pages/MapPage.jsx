import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapPage() {
  const [location, setLocation] = useState(null); // 사용자 위치 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMsg, setErrorMsg] = useState(null); // 오류 메시지
  const [address, setAddress] = useState(''); // 현재 위치 주소

  useEffect(() => {
    (async () => {
      try {
        // 위치 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Permission status:', status);

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // 현재 위치 가져오기
        const userLocation = await Location.getCurrentPositionAsync({});
        console.log('User location:', userLocation);

        const coords = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };
        setLocation(coords);

        // 역지오코딩을 통해 주소 가져오기
        const [geocodedAddress] = await Location.reverseGeocodeAsync(coords);
        console.log('Reverse geocoded address:', geocodedAddress);

        const formattedAddress = `${geocodedAddress.city || ''} ${geocodedAddress.street || ''}`;
        setAddress(formattedAddress || 'Unknown location');
      } catch (error) {
        console.error('Error fetching location or address:', error);
        setErrorMsg('Error fetching location or address');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.06, // 줌 상태 조정(작을수록 확대)
          longitudeDelta: 0.06,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={location}
          title={address} // 현재 위치의 주소 또는 지명
          description="저는 현재 여기에 있어요!"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
