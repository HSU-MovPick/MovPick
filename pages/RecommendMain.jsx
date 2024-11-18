import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Image, ScrollView } from 'react-native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';

export default function RecommendMain() {
  return (
    <Background>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <RecommendMainLayout>
      <RecommnedFrame>
        <Intro>감정 기반 영화 추천을{'\n'}받아보세요</Intro>
        <EmoticonWrapper>
          <Emoticon source={require('../assets/emoticon1.png')} />
        </EmoticonWrapper>
        <ButtonWrapper>
          <RecommendMainButton text="감정 분석하러 가기"/>
        </ButtonWrapper>
      </RecommnedFrame>

      <RecommnedFrame>
        <Intro>상황별 맞춤형 {'\n'}영화 추천을 경험해보세요!</Intro>
        <EmoticonWrapper>
          <Emoticon source={require('../assets/emoticon2.png')} />
        </EmoticonWrapper>
        <ButtonWrapper>
          <RecommendMainButton text="상황별 맞춤형 추천 받기"/>
        </ButtonWrapper>
      </RecommnedFrame>
      </RecommendMainLayout>
      </ScrollView>
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
