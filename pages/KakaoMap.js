import React, { useState, useEffect } from 'react'; // React와 React Hooks import
import { Alert } from 'react-native'; // Alert 모듈 import
import { WebView } from 'react-native-webview'; // WebView 모듈 import
import styled from 'styled-components/native'; // 스타일링을 위한 styled-components import
import * as Location from 'expo-location'; // 사용자 위치 데이터를 가져오기 위한 Expo Location API import
import KAKAO_API_KEY from '../config/keys'; // Kakao API 키 import

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

      // 현재 위치 데이터 가져오기
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
          <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services"></script>
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

              // 현재 위치 마커 표시
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(${userLocation.latitude}, ${userLocation.longitude}),
                title: '현재 위치'
              });

              var ps = new kakao.maps.services.Places();
              var brands = ['CGV', '롯데시네마', '메가박스'];

              // 각 브랜드별 장소 검색
              brands.forEach(function(brand) {
                ps.keywordSearch(brand, function(data, status) {
                  if (status === kakao.maps.services.Status.OK) {
                    data.forEach(function(place) {
                      var marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(place.y, place.x),
                        title: place.place_name
                      });

                      var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="padding:5px;">' + place.place_name + '</div>'
                      });

                      kakao.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                      });
                    });
                  } else {
                    console.error('Places Search Failed:', status);
                  }
                }, {
                  location: new kakao.maps.LatLng(${userLocation.latitude}, ${userLocation.longitude}),
                  radius: 5000
                });
              });
            } catch (error) {
              document.body.innerHTML = '<p style="color:red;">Error: ' + error.message + '</p>';
            }
          </script>
        </body>
        </html>
      `;
      setHtml(mapHtml);
    }
  }, [userLocation]); // userLocation 상태가 변경될 때마다 실행

  if (!userLocation) {
    return null; // 위치 정보를 가져오기 전에는 빈 화면 표시
  }

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
  flex: 1; /* 화면 전체를 차지 */
  width: 100%; /* 너비 100% */
  height: 100%; /* 높이 100% */
  border-radius: 10px; /* 둥근 모서리 */
  overflow: hidden; /* 컨테이너 밖의 내용 숨김 */
`;
