import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapTest() {
  const kakaoMapHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=316b52acf34380094ffea87c9fee850e"></script>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
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
        // 지도 생성
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
          level: 3 // 확대 레벨
        };
        var map = new kakao.maps.Map(container, options);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: kakaoMapHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
