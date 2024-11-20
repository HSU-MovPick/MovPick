import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

// 추천 페이지 기본 버튼 컴포넌트 (width : 300)
export default function RecommendMainButton({text, onPress}) {
  return (
    <ButtonLayout onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </ButtonLayout>
  );
}

const ButtonLayout=styled(TouchableOpacity)`
  background-color: #C73659;
  width: 300px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 23.43px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;