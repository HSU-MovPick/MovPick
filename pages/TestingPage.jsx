import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import StandardMovieCard from '../shared/components/StandardMovieCard';
import { getAllMovies } from '../api/getAllMovies'; // 분리된 함수 import

export default function TestingPage() {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태

  useEffect(() => {
    const getMovies = async () => {
      const moviesList = await getAllMovies(); // 분리된 함수 호출
      setMovies(moviesList); // 상태 업데이트
    };
    getMovies(); // Firestore 데이터 가져오기 호출
  }, []);

  return (
    <Background>
      <Container>
        <Text>테스트용 페이지</Text>
        {movies.map((movie) => (
          <StandardMovieCard
            key={movie.id} // 고유 key 추가
            moviePoster={movie.poster} // Firestore에서 가져온 URL
            movieTitle={movie.title}
            movieCategory={movie.genre.join(' #')} // 배열을 문자열로 변환
            movieReleaseDate={movie.release_date}
          />
        ))}
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
