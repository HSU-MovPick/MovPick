import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Image } from 'react-native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';

export default function EmotionRecommendMain() {
  return (
    <Background>

      <RecommendMainLayout>
      <Intro>상황별 맞춤형 {'\n'}영화 추천을 경험해보세요!</Intro>
        <EmoticonWrapper>
          <Emoticon source={require('../assets/emoticon2.png')} />
        </EmoticonWrapper>
        <ButtonWrapper>
          <RecommendMainButton text="상황별 맞춤형 추천 받기"/>
          </ButtonWrapper>
      </RecommendMainLayout>
    </Background>
  );
}


const RecommendMainLayout=styled.View`
  padding: 80px 3px;
  gap:60px;
`
const RecommnedFrame=styled.View`
  gap:5px;
`
const EmoticonWrapper=styled.View`
  align-items:center;
`

const ButtonWrapper=styled.View`
  align-items:center;
`

const Intro = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-weight: 900;
  text-align: left;
`;

const Emoticon = styled.Image`
  width: 250px;
  height: 250px;
  margin: 10px;
  justify-contnet:center;
`;
