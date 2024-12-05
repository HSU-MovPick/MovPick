import React from "react";
import styled from "styled-components/native";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import StandardBackground from "../shared/components/StandardBackground";
import QuestionButton from "../entities/Chatbot/ui/QuestionButton";
import { useNavigation } from "@react-navigation/native";
import StandardMovieCard from "../shared/components/StandardMovieCard";
import ResultMessage from "../entities/Chatbot/ui/ResultMessage";

export default function ChatbotResultPage({ route }) {
  const navigation = useNavigation();
  const { movie } = route.params; // 전달받은 영화 정보

  return (
    <>
      <StandardBackground>
        <Container>
          
          {/* 결과 영화 카드 */}
          {movie ? (
            <StandardMovieCard
              key={movie.id}
              moviePoster={movie.poster}
              movieTitle={movie.title}
              movieCategory={movie.genre.join(" #")} // 배열을 문자열로 변환
              movieReleaseDate={movie.release_date}
            />
          ) : (
            <MessageText>영화 정보를 가져올 수 없습니다.</MessageText>
          )}
          {/* 결과 멘트 */}
          <ResultMessage />
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

const MessageText = styled.Text`
  font-size: 18px;
  color: gray;
  margin-bottom: 20px;
`;
