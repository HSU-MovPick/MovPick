import React, { useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { ScrollView } from 'react-native';
import SelectButton from '../entities/SelectPage/ui/SelectButton';
import SelectSubmitButton from '../entities/SelectPage/ui/SelectSubmitButton';
import { useNavigation } from '@react-navigation/native';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';

// 상황 기반 영화 추천 선택 페이지
export default function SelectPage() {
  const navigation = useNavigation();
  // 각각의 질문에 대한 상태 관리
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  // 선택 상태를 설정 및 동일한 항목일 경우 취소
  const toggleSelection = (currentValue, setValue, newValue) => {
    if (currentValue === newValue) {
      setValue(null); // 선택 취소
    } else {
      setValue(newValue); // 선택
    }
  };

  const handleSubmit = () => {
    if (selectedPerson && selectedTime && selectedPurpose) {
      const selectedData = {
        person: selectedPerson,
        time: selectedTime,
        purpose: selectedPurpose,
      };
  
      // 장르 추천 로직
      let genre = '';
      if (selectedPerson === 'lover') {
        if (selectedTime === 'morning') {
          if (selectedPurpose === 'romantic') {
            genre = '로맨스';
          } else if (selectedPurpose === 'emotional') {
            genre = '드라마';
          } else {
            genre = '뮤지컬';
          }
        } else if (selectedTime === 'afternoon') {
          if (selectedPurpose === 'romantic') {
            genre = '로맨스';
          } else if (selectedPurpose === 'stress') {
            genre = '코미디';
          } else {
            genre = '액션';
          }
        } else if (selectedTime === 'night') {
          if (selectedPurpose === 'romantic') {
            genre = '로맨스';
          } else if (selectedPurpose === 'emotional') {
            genre = '공포';
          } else {
            genre = '스릴러';
          }
        }
      } else if (selectedPerson === 'family') {
        if (selectedTime === 'morning') {
          if (selectedPurpose === 'healing') {
            genre = '애니메이션';
          } else if (selectedPurpose === 'stress') {
            genre = '코미디';
          } else {
            genre = '역사';
          }
        } else if (selectedTime === 'afternoon') {
          if (selectedPurpose === 'healing') {
            genre = '가족 영화';
          } else if (selectedPurpose === 'immersion') {
            genre = '모험';
          } else {
            genre = '드라마';
          }
        } else if (selectedTime === 'night') {
          if (selectedPurpose === 'immersion') {
            genre = '전쟁';
          } else if (selectedPurpose === 'stress') {
            genre = '스릴러';
          } else {
            genre = '판타지';
          }
        }
      } else if (selectedPerson === 'friend') {
        if (selectedTime === 'morning') {
          if (selectedPurpose === 'stress') {
            genre = '코미디';
          } else if (selectedPurpose === 'immersion') {
            genre = '모험';
          } else {
            genre = '애니메이션';
          }
        } else if (selectedTime === 'afternoon') {
          if (selectedPurpose === 'immersion') {
            genre = '액션';
          } else if (selectedPurpose === 'stress') {
            genre = '스릴러';
          } else {
            genre = '판타지';
          }
        } else if (selectedTime === 'night') {
          if (selectedPurpose === 'emotional') {
            genre = '공포';
          } else if (selectedPurpose === 'stress') {
            genre = '스릴러';
          } else {
            genre = 'SF';
          }
        }
      }
  
      // 선택 결과 출력 (영화 데이터 불러오기 준비)
      console.log('선택된 데이터:', selectedData);
      console.log('추천 장르:', genre);
  
      navigation.navigate('SituationSelectResult', { genre, selectedPerson, selectedPurpose, selectedTime });
    
    } else {
      console.log('모든 항목을 선택해주세요.');
      alert('모든 항목을 선택해주세요.');
    }
  };
  
  
  

  return (
    <>
    <Background>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* 상황 선택 레이아웃 */}
        <SituationSelectLayout>
          {/* 선택 폼 */}
          <SelectForm>
            {/* 질문 */}
            <Question>누구랑 보나요?</Question>
            {/* 답변 버튼 영역 */}
            <ButtonWrapper>
              {/* 버튼 */}
              <SelectButton
                text="연인이랑"
                onPress={() => toggleSelection(selectedPerson, setSelectedPerson, 'lover')}
                selected={selectedPerson === 'lover'}
              />
              {/* 버튼 */}
              <SelectButton
                text="가족이랑"
                onPress={() => toggleSelection(selectedPerson, setSelectedPerson, 'family')}
                selected={selectedPerson === 'family'}
              />
              {/* 버튼 */}
              <SelectButton
                text="친구랑"
                onPress={() => toggleSelection(selectedPerson, setSelectedPerson, 'friend')}
                selected={selectedPerson === 'friend'}
              />
            </ButtonWrapper>
          </SelectForm>

          {/* 선택 폼 */}
          <SelectForm>
            {/* 질문 */}
            <Question>언제 보나요?</Question>
            {/* 버튼 영역 */}
            <ButtonWrapper>
              {/* 답변 버튼 */}
              <SelectButton
                text="아침"
                onPress={() => toggleSelection(selectedTime, setSelectedTime, 'morning')}
                selected={selectedTime === 'morning'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="오후"
                onPress={() => toggleSelection(selectedTime, setSelectedTime, 'afternoon')}
                selected={selectedTime === 'afternoon'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="심야"
                onPress={() => toggleSelection(selectedTime, setSelectedTime, 'night')}
                selected={selectedTime === 'night'}
              />
            </ButtonWrapper>
          </SelectForm>

          {/* 선택 폼 */}
          <SelectForm>
            {/* 질문 */}
            <Question>무슨 목적으로 보나요?</Question>
            {/* 버튼 영역 */}
            <ButtonWrapper>
              {/* 답변 버튼 */}
              <SelectButton
                text="스트레스 해소"
                onPress={() => toggleSelection(selectedPurpose, setSelectedPurpose, 'stress')}
                selected={selectedPurpose === 'stress'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="힐링"
                onPress={() => toggleSelection(selectedPurpose, setSelectedPurpose, 'healing')}
                selected={selectedPurpose === 'healing'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="몰입"
                onPress={() => toggleSelection(selectedPurpose, setSelectedPurpose, 'immersion')}
                selected={selectedPurpose === 'immersion'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="감성 충전"
                onPress={() => toggleSelection(selectedPurpose, setSelectedPurpose, 'emotional')}
                selected={selectedPurpose === 'emotional'}
              />
              {/* 답변 버튼 */}
              <SelectButton
                text="로맨틱한 분위기 형성"
                onPress={() => toggleSelection(selectedPurpose, setSelectedPurpose, 'romantic')}
                selected={selectedPurpose === 'romantic'}
              />
            </ButtonWrapper>
          </SelectForm>

          {selectedPerson && selectedTime && selectedPurpose && (
            // 제출 영역
            <SubmitWrapper>
              {/* 제출 버튼 */}
              <SelectSubmitButton text="추천 받기" onPress={handleSubmit} />
            </SubmitWrapper>
          )}
        </SituationSelectLayout>
      </ScrollView>
    </Background>
    <FooterNavigationBar/>
    </>
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
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const SubmitWrapper = styled.View`
  align-items: center;
`;