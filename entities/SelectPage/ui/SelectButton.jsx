import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Image } from 'react-native';
import CheckIcon from '../../../assets/checkIcon.png';

// 상황 기반 추천 선택 버튼 컴포넌트
export default function SelectButton({ text, onPress, selected }) {
  return (
    <View>
      <ButtonLayout onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </ButtonLayout>
      {selected && ( // 상위 컴포넌트에서 전달받은 selected prop을 사용
        <Icon>
          <StyledImage source={CheckIcon} />
        </Icon>
      )}
    </View>
  );
}

const ButtonLayout = styled(TouchableOpacity)`
  background-color: #C73659;
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 23.43px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 800;
  text-shadow-color: rgba(0, 0, 0, 1);
  text-shadow-offset: 3px 3px;
  
`;

const Icon = styled.View`
  position: absolute;
  top: -10px;
  right: 0px;
`;

const StyledImage = styled.Image`
  width: 24px;
  height: 24px;
`;
