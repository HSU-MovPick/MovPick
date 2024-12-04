import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Image, Platform } from 'react-native';

// 상황 기반 추천 선택 버튼 컴포넌트
export default function QuestionButton({ text, onPress, selected }) {
  return (
    <View>
      <ButtonLayout onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </ButtonLayout>
    </View>
  );
}

const ButtonLayout = styled(TouchableOpacity)`
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 16px; 
  background-color: #FFF;
  // 그림자처리
  ${Platform.select({
    ios: `
      shadow-color: rgba(0, 0, 0, 0.25);
      shadow-offset: 0px 4px;
      shadow-opacity: 0.25;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 4;
    `,
  })}
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 800;
  text-shadow-color: rgba(0, 0, 0, 1);
`;