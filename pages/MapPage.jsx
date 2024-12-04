import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../config/keys'; // Google Maps API 키 파일

export default function MapPage() {
  const [location, setLocation] = useState(null); // 사용자 위치 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMsg, setErrorMsg] = useState(null); // 오류 메시지
  const [cinemas, setCinemas] = useState([]); // 영화관 데이터
  const [region, setRegion] = useState(null); // 현재 지도 영역
  const [address, setAddress] = useState(''); // 현재 위치 주소
  const isFetching = useRef(false); // 데이터를 가져오는 중인지 추적

  const fetchCinemas = async (coords) => {
    try {
      if (isFetching.current) return; // 이미 데이터를 가져오는 중이라면 중복 호출 방지
      isFetching.current = true;

      const fetchCinemasByBrand = async (brand) => {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              location: `${coords.latitude},${coords.longitude}`, // 기준 위치
              radius: 5000, // 반경 5km
              keyword: brand,
              type: 'movie_theater', // 영화관 타입
              key: GOOGLE_API_KEY, // API 키
            },
          }
        );
        return response.data.results;
      };

      const cgvCinemas = await fetchCinemasByBrand('CGV');
      const lotteCinemas = await fetchCinemasByBrand('롯데시네마');
      const megaboxCinemas = await fetchCinemasByBrand('메가박스');

      const allCinemas = [...cgvCinemas, ...lotteCinemas, ...megaboxCinemas];
      const uniqueCinemas = Array.from(
        new Set(allCinemas.map((cinema) => cinema.place_id))
      ).map((id) => allCinemas.find((cinema) => cinema.place_id === id));

      setCinemas(uniqueCinemas);
    } catch (error) {
      console.error('Error fetching cinemas:', error.response ? error.response.data : error.message);
    } finally {
      isFetching.current = false;
    }
  };

  // 초기 사용자 위치 가져오기
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };

        setLocation(coords);
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        });

        // 역지오코딩을 통해 주소 가져오기
        const [geocodeAddress] = await Location.reverseGeocodeAsync(coords);
        console.log('Reverse geocoded address: ', geocodeAddress);

        const formattedAddress = `${geocodeAddress.city || ''} ${geocodeAddress.street || ''}`;
        setAddress(formattedAddress || 'Unknown location');

        await fetchCinemas(coords); // 초기 영화관 데이터
      } catch (error) {
        console.error('Error fetching initial location:', error.message);
        setErrorMsg('Error fetching initial location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRegionChangeComplete = (newRegion) => {
    // 지도 이동 이벤트 처리
    if (!region) return;
    const distanceMoved = Math.sqrt(
      Math.pow(newRegion.latitude - region.latitude, 2) +
        Math.pow(newRegion.longitude - region.longitude, 2)
    );

    if (distanceMoved > 0.01) { // 일정 거리 이상 이동한 경우에만 데이터 요청
      setRegion(newRegion);
      fetchCinemas({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
    }
  };

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
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        showsUserLocation={true} // 현재 위치를 기본 마커로 표시
      >
        {/* 현재 위치 마커 */}
        <Marker
          coordinate={location}
          title={address}
          description={"저는 여기 있어요!"}
          anchor={{ x: 0.5, y: 0.5 }} // 마커 기준점을 조정
        >
          <Image
            source={require('../assets/mapicon.jpg')} // 로컬 이미지 경로
            style={{
              width: 40, // 너비 조정
              height: 40, // 높이 조정
              transform: [{ translateY: -25 }], // 이미지 상단으로 이동
            }}
            resizeMode="contain" // 이미지 비율 유지
          />
        </Marker>

        {/* 영화관 마커 */}
        {cinemas.map((cinema, index) => {
          if (!cinema.geometry || !cinema.geometry.location) {
            return null;
          }
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: cinema.geometry.location.lat,
                longitude: cinema.geometry.location.lng,
              }}
              title={cinema.name}
              description={cinema.vicinity}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // 지도 크기를 화면 전체로 설정
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
    color: 'red', // 오류 메시지 색상
  },
});
