import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import KAKAO_API_KEY from '../config/keys';

export default function KakaoMap() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}"></script>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        #map {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780), 
          level: 3 
        };
        var map = new kakao.maps.Map(container, options);
      </script>
    </body>
    </html>
  `;

  return (
    <MapContainer>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </MapContainer>
  );
}

const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
