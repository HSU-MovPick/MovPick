import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import * as Location from 'expo-location'; // 사용자 위치 데이터를 가져오기 위한 Expo Location API import
import KAKAO_API_KEY from '../config/keys';

// Kakao 지도 컴포넌트
export default function KakaoMap() {
  const [userLocation, setUserLocation] = useState(null); // 사용자 위치 상태 초기화
  const [html, setHtml] = useState(''); // WebView에 전달할 HTML 코드 상태 초기화

  // 사용자 위치를 요청하고 상태에 저장하는 useEffect
  useEffect(() => {
    (async () => {
      // 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // 권한이 거부된 경우 Alert 메시지 표시
        Alert.alert('위치 권한 필요', '현재 위치를 사용하려면 권한을 허용하세요.');
        return;
      }

      // 위치 데이터 가져오기
      let location = await Location.getCurrentPositionAsync({});
      // 위치 데이터를 상태에 저장
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번 실행

  // 사용자 위치가 변경되었을 때 HTML 생성
  useEffect(() => {
    if (userLocation) {
      const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}"></script>
          <style>
            #map { width: 100%; height: 100%; }
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            try {
              var mapContainer = document.getElementById('map');
              var mapOption = {
                center: new kakao.maps.LatLng(${userLocation.latitude}, ${userLocation.longitude}),
                level: 3
              };
              var map = new kakao.maps.Map(mapContainer, mapOption);
            } catch (error) {
              document.body.innerHTML = '<p style="color:red;">Error: ' + error.message + '</p>';
            }
          </script>
        </body>
        </html>
      `;
      setHtml(mapHtml); // 생성된 HTML을 상태에 저장
    }
  }, [userLocation]); // userLocation 상태가 변경될 때마다 실행

  // 사용자 위치를 아직 가져오지 못한 경우 빈 화면 표시
  if (!userLocation) {
    return null; // 위치 정보를 가져오기 전에는 빈 화면 // 아무것도 렌더링하지 않음
  }

  // WebView를 통해 Kakao 지도를 렌더링
  return (
    <MapContainer>
      <WebView
        originWhitelist={['*']} // 모든 도메인 허용
        source={{ html }} // WebView에 HTML 전달
        style={{ flex: 1 }} // WebView가 화면을 가득 채우도록 설정
        javaScriptEnabled={true} // JavaScript 활성화
        domStorageEnabled={true} // DOM Storage 활성화
      />
    </MapContainer>
  );
}

// 스타일링: 지도 컨테이너
const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
