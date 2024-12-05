import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import StandardMovieCard from '../shared/components/StandardMovieCard';
import { db } from '../firebase'; // Firestore 초기화 파일 import
import { collection, getDocs } from 'firebase/firestore';

// firebase 통신 예시 코드
export default function TestingPage() {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'movies'));
        const moviesList = snapshot.docs.map((doc) => ({
          id: doc.id, // 문서 ID 포함
          ...doc.data(), // 문서 데이터 포함
        }));
        setMovies(moviesList); // 상태 업데이트
        console.log('Fetched movies:', moviesList);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies(); // Firestore 데이터 가져오기 호출
  }, []);

  return (
    <Background>
      <Container>
        <Text>테스트용 페이지</Text>
        {movies.map((movie) => (
          <StandardMovieCard
            moviePoster={{ uri: movie.poster }} // Firestore에서 가져온 URL
            movieTitle={movie.title}
            movieCategory={movie.genre}
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