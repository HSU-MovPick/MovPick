import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Platform } from 'react-native';

export default function QuestionButton({ text, onPress }) {
  return (
    <View>
      <ButtonLayout onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </ButtonLayout>
    </View>
  );
}

const ButtonLayout = styled(TouchableOpacity)`
  width:300px;
  height:50px;
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 16px; 
  background-color: #FFF;
  ${shadowStyle}; 
`;

const ButtonText = styled.Text`
  color: #A91D3A; 
  font-size: 18px;
  font-weight: 800;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 0.5px 0.5px;
  text-shadow-radius: 0.8px;
`;


// 그림자 스타일 
const shadowStyle = Platform.select({
  ios: `
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
  `,
  android: `
    elevation: 4;
  `,
});