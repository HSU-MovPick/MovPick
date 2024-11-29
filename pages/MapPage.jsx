import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import MapCard from '../shared/components/MapCard';
import KakaoMap from './KakaoMap';

// 지도 페이지 
export default function MapPage() {
  return (
    <Background>
      <MapCard>
        <KakaoMap />
      </MapCard>
    </Background>
  );
}

const Text = styled.Text`
  font-size: 50px;
  color: #C73659;
`;
