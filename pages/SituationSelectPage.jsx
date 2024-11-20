import React, { useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { ScrollView } from 'react-native';
import SelectButton from '../entities/SelectPage/ui/SelectButton';

export default function SelectPage() {
  // 각각의 질문에 대한 상태 관리
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  return (
    <Background>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SituationSelectLayout>
          <SelectForm>
            <Question>누구랑 보나요?</Question>
            <ButtonWrapper>
              <SelectButton
                text="연인이랑"
                onPress={() => setSelectedPerson('lover')}
                selected={selectedPerson === 'lover'}
              />
              <SelectButton
                text="가족이랑"
                onPress={() => setSelectedPerson('family')}
                selected={selectedPerson === 'family'}
              />
              <SelectButton
                text="친구랑"
                onPress={() => setSelectedPerson('friend')}
                selected={selectedPerson === 'friend'}
              />
            </ButtonWrapper>
          </SelectForm>

          <SelectForm>
            <Question>언제 보나요?</Question>
            <ButtonWrapper>
              <SelectButton
                text="아침"
                onPress={() => setSelectedTime('morning')}
                selected={selectedTime === 'morning'}
              />
              <SelectButton
                text="오후"
                onPress={() => setSelectedTime('afternoon')}
                selected={selectedTime === 'afternoon'}
              />
              <SelectButton
                text="심야"
                onPress={() => setSelectedTime('night')}
                selected={selectedTime === 'night'}
              />
            </ButtonWrapper>
          </SelectForm>

          <SelectForm>
            <Question>무슨 목적으로 보나요?</Question>
            <ButtonWrapper>
              <SelectButton
                text="스트레스 해소"
                onPress={() => setSelectedPurpose('stress')}
                selected={selectedPurpose === 'stress'}
              />
              <SelectButton
                text="힐링"
                onPress={() => setSelectedPurpose('healing')}
                selected={selectedPurpose === 'healing'}
              />
              <SelectButton
                text="몰입"
                onPress={() => setSelectedPurpose('immersion')}
                selected={selectedPurpose === 'immersion'}
              />
              <SelectButton
                text="감성 풀충전"
                onPress={() => setSelectedPurpose('emotional')}
                selected={selectedPurpose === 'emotional'}
              />
              <SelectButton
                text="로맨틱한 분위기 형성"
                onPress={() => setSelectedPurpose('romantic')}
                selected={selectedPurpose === 'romantic'}
              />
            </ButtonWrapper>
          </SelectForm>
        </SituationSelectLayout>
      </ScrollView>
    </Background>
  );
}

const SituationSelectLayout = styled.View`
  padding: 80px 3px;
  gap: 60px;
`;

const SelectForm = styled.View`
  gap: 10px;
`;

const Question = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-weight: 900;
  text-align: left;
`;

const ButtonWrapper = styled.View`
  align-items: flex-start;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;
