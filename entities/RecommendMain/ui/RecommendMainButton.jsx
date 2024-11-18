import React from 'react';
import styled from 'styled-components/native';

export default function RecommendMainButton({text}) {
  return (
    <ButtonLayout>
        <ButtonText>{text}</ButtonText>
    </ButtonLayout>
  );
}

const ButtonLayout=styled.View`
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