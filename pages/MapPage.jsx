import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import MapCard from '../shared/components/MapCard';
import KakaoMap from './KakaoMap';
import { StyleSheet } from 'react-native';


// 지도 페이지 
export default function MapPage() {
  return (
    // <Background>
    //   <MapCard>
    //     <KakaoMap />
    //   </MapCard>
    // </Background>
    <KakaoMap />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});