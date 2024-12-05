import React from "react";
import styled from "styled-components/native";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import StandardBackground from "../shared/components/StandardBackground";
import StandardMovieCard from "../shared/components/StandardMovieCard";
import ResultMessage from "../entities/Chatbot/ui/ResultMessage";
import ResultButton from "../entities/Chatbot/ui/ResultButton";

export default function ChatbotResultPage({ route }) {
  const { movie } = route.params;

  return (
    <>
      <StandardBackground>
        <Container>
          {/* 영화 카드 */}
          {movie ? (
            <StandardMovieCard
              key={movie.id}
              moviePoster={movie.poster}
              movieTitle={movie.title}
              movieCategory={movie.genre.join(" #")}
              movieReleaseDate={movie.release_date}
            />
          ) : (
            <MessageText>영화 정보를 가져올 수 없습니다.</MessageText>
          )}
          {/* 결과 메시지 */}
          <ResultMessage UserName="해핑" MovieTitle="베테랑" />
          {/* 결과 버튼 */}
          <ResultButton />
        </Container>
      </StandardBackground>

      {/* 하단 네비게이션 바 */}
      <FooterNavigationBar />
    </>
  );
}

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
