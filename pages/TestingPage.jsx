import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';

export default function TestingPage() {
  return (
    <Background>
      <Container>
        <Text>테스트용 페이지</Text>
      </Container>
    </Background>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 50px;
  color: #C73659;
`;
