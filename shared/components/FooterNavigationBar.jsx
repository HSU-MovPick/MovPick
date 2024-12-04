import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import {ListSearchImg} from '../../assets/footer/list-search.svg'; // 목록
import {ChatbotImg} from '../../assets/footer/chatbot.svg'; // 챗봇
import {RecommendImg} from '../../assets/footer/recommend.svg'; //감정추천
import {LocationImg} from '../../assets/footer/location.svg'; // 위치


export default function FooterNavigationBar() {
    const navigation = useNavigation();

    return (
        <Footer>
            <NavButton onPress={() => navigation.navigate('ListPage')}>
                <ButtonText>목록</ButtonText>
            </NavButton>
            <NavButton onPress={() => navigation.navigate('ChatbotPage')}>
                <ButtonText>챗봇</ButtonText>
            </NavButton>
            <NavButton onPress={() => navigation.navigate('EmotionRecommendation')}>
                <ButtonText>감정추천</ButtonText>
            </NavButton>
            <NavButton onPress={() => navigation.navigate('LocationPage')}>
                <ButtonText>위치</ButtonText>
            </NavButton>
        </Footer>
    );
}

const Footer = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #330E0E;
  backdrop-filter: blur(10px); /* 블러 효과 */
  position: absolute;
  bottom: 0;
`;

const NavButton = styled.TouchableOpacity`
  width: 24.25rem; /* 388px */
  height: 3.625rem; /* 58px */
  flex-shrink: 0;
  background-color: #330E0E;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
