import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';

// 감정 기반 추천을 위한 카메라 페이지
export default function CameraPage() {
  return (
    <Background>

      <RecommendMainLayout>
      <RecommnedFrame>
        <Intro>얼굴을 촬영해주세요</Intro>
        <CameraWrapper>

        </CameraWrapper>
      </RecommnedFrame>
      </RecommendMainLayout>
    </Background>
  );
}


const RecommendMainLayout=styled.View`
  padding: 40px 3px;
  gap:60px;
`
const RecommnedFrame=styled.View`
  gap:5px;
`
const CameraWrapper=styled.View``;

const Intro = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-weight: 900;
  text-align: center;
`;
