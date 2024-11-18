import React from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import MovieCard from '../shared/components/MovieCard';

export default function ChatbotPage() {
// 데이터 전달 필요 -> 우선은 값 직접 전달
  const movieTitle = "베테랑2";
  const movieCategory = "범죄, 액션, 스릴러";
  const movieReleaseDate = "2024.01.15";

  return (
    <Background>
      <Container>
        <MovieCard 
          movieTitle={movieTitle} //제목
          movieCategory={movieCategory}  //카테고리
          movieReleaseDate={movieReleaseDate} //개봉일자
        />
      </Container>
    </Background>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
