import React from "react";
import FooterNavigationBar from "../../shared/components/FooterNavigationBar";
import StandardMovieCard from "../../shared/components/StandardMovieCard"; 
import StandardBackground from "../../shared/components/StandardBackground";
import styled from "styled-components/native";

// 더미 데이터
const moviePoster = "https://via.placeholder.com/150";
const movieTitle = "The Great Adventure";
const movieCategory = "Adventure";
const movieReleaseDate = "2024-12-10";

// 질문화면 - 초기화면
export default function ChatbotWelcomePage() {
  return (
    <>
      <StandardBackground>
        <Container>
          {/* 영화 카드 */}
          <StandardMovieCard
            moviePoster={moviePoster}
            movieTitle={movieTitle}
            movieCategory={movieCategory}
            movieReleaseDate={movieReleaseDate}
          />
          {/* 질문하러 가기 버튼 */}
          <ButtonContainer>
            <QuestionButton onPress={() => console.log("질문하러 가기 클릭!")}>
              질문하러 가기
            </QuestionButton>
          </ButtonContainer>
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

const QuestionButton = styled.TouchableOpacity`
  background-color: #a91d3a;
  padding: 15px 30px;
  border-radius: 10px;
`;

const QuestionButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
