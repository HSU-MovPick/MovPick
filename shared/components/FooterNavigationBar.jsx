import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native'; // React Native의 Image 컴포넌트 사용


export default function FooterNavigationBar() {
    const navigation = useNavigation();

    return (
        <Footer>
            <NavButton onPress={() => navigation.navigate('MovieList')}>
                {/* 목록 */}
                <Image source={require('../../assets/footer/list-search.png')} style={{ width: 24, height: 24 }} />
            </NavButton>
            <NavButton onPress={() => navigation.navigate('ChatbotWelcomePage')}>
                {/* 챗봇 */}
                <Image source={require('../../assets/footer/chatbot.png')} style={{ width: 24, height: 24 }} />
            </NavButton>
            <NavButton onPress={() => navigation.navigate('RecommendMain')}>
                {/* 감정추천 */}
                <Image source={require('../../assets/footer/recommend.png')} style={{ width: 24, height: 24 }} />
            </NavButton>
            <NavButton onPress={() => navigation.navigate('MapPage')}>
                {/* 위치 */}
                <Image source={require('../../assets/footer/location.png')} style={{ width: 24, height: 24 }} />
            </NavButton>
        </Footer>
    );
}

const Footer = styled.View`
  width: 100%;
  height: 65px;
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
  margin-bottom:10px;

`;
