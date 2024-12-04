import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Image, ScrollView } from 'react-native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import { useNavigation } from '@react-navigation/native';

// 영화 추천 메인 페이지
export default function RecommendMain() {
  const navigation = useNavigation();
  return (
    <Background>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
       {/* 추천 메인 레이아웃 */}
      <RecommendMainLayout>
        {/* 감정 추천 틀 */}
        <RecommnedFrame>
          {/* 인트로 */}
          <Intro>감정 기반 영화 추천을{'\n'}받아보세요</Intro>

          {/* 이모티콘 영역 */}
          <EmoticonWrapper>
            {/* 이모티콘 */}
            <Emoticon source={require('../assets/emoticon1.png')} />
          </EmoticonWrapper>

          {/* 버튼 영역 */}
          <ButtonWrapper>
            {/* 버튼 */}
            <RecommendMainButton text="감정 분석하러 가기" onPress={()=>navigation.navigate('EmotionRecommendMain')}/>
          </ButtonWrapper>
        </RecommnedFrame>

        {/* 상황별 맞춤 추천 틀 */}
        <RecommnedFrame>
          {/* 인트로 */}
          <Intro>상황별 맞춤형 {'\n'}영화 추천을 경험해보세요!</Intro>
          {/* 이모티콘 영역 */}
          <EmoticonWrapper>
            {/* 이모티콘 */}
            <Emoticon source={require('../assets/emoticon2.png')} />
          </EmoticonWrapper>

          {/* 버튼 영역 */}
          <ButtonWrapper>
            {/* 버튼 */}
            <RecommendMainButton text="상황별 맞춤형 추천 받기" onPress={()=>navigation.navigate('SituationRecommendMain')}/>
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
