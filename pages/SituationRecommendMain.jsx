import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';

// 상황 기반 추천 메인 페이지
export default function SituationRecommendMain() {
  const navigation=useNavigation();
  return (
    <>
    <Background>

      <RecommendMainLayout>
      <Intro>상황별 맞춤형 {'\n'}영화 추천을 경험해보세요!</Intro>
        <EmoticonWrapper>
          <Emoticon source={require('../assets/emoticon2.png')} />
        </EmoticonWrapper>
        <ButtonWrapper>
          <RecommendMainButton text="상황별 맞춤형 추천 받기"
          onPress={()=>navigation.navigate('SituationSelectPage')}/>
          </ButtonWrapper>
      </RecommendMainLayout>
      <FooterNavigationBar />
    </Background>

    </>
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
