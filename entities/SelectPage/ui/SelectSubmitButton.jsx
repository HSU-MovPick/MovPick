import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

// 싱황 기반 추천 페이지 폼 제출 버튼
export default function RecommendMainButton({text, onPress}) {
  return (
    <ButtonLayout onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </ButtonLayout>
  );
}

const ButtonLayout=styled(TouchableOpacity)`
  background-color: #FFFFFF;
  width: 300px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 23.43px;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;