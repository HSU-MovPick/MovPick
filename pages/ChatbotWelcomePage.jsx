import React from "react";
import styled from "styled-components/native";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import StandardBackground from "../shared/components/StandardBackground"
import WelcomeMessage from "../entities/Chatbot/ui/WelcomeMessage";
import ChatExample from "../entities/Chatbot/ui/ChatExample";
import QuestionButton from "../entities/Chatbot/ui/QuestionButton"
import { useNavigation } from "@react-navigation/native"; // Navigation hook

// 더미 데이터
const moviePoster = "https://via.placeholder.com/150";
const movieTitle = "The Great Adventure";
const movieCategory = "Adventure";
const movieReleaseDate = "2024-12-10";

// 질문화면 - 초기화면
export default function ChatbotWelcomePage() {
  const navigation = useNavigation(); // Navigation hook 사용

  return (
    <>
      <StandardBackground>
        <Container>
          {/* 질문하기 환영 멘트 */}
          <WelcomeMessage></WelcomeMessage>
          {/* 채팅 예시 */}
          <ChatExample></ChatExample>
          {/* 질문하러 가기 버튼 */}
          <QuestionButton 
              text="질문하러 가기" 
              onPress={() => navigation.navigate("ChatbotChattingPage")} 
            />
        </Container>
      </StandardBackground>

      {/* 하단 네비게이션 바 */}
      <FooterNavigationBar />
    </>
  );
}

// 스타일링 정의
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;
