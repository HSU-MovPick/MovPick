import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import StandardMovieCard from '../shared/components/StandardMovieCard';
import { getAllMovies, getMoviesByTitle, addMoviesToDB, getMoviesByGenre } from '../api/movies'; // 분리된 함수 import
import moviesData from '../data/moviesData'; // firebase에 넣을 Data 가져오기


export default function TestingPage() {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태

  const logMovieTitles = (moviesList) => {
    console.log('Fetched movie titles:', moviesList.map((movie) => movie.title));
  };

  // 전체 조회 예시 
  const handleFetchAllMovies = async () => {
    try {
      const moviesList = await getAllMovies(); // 전체 영화 조회
      setMovies(moviesList); // 상태 업데이트
      logMovieTitles(moviesList); // 영화 제목만 로그 출력
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  };

  // 장르로 조회 예시
  const handleFetchMoviesByGenre = async () => {
    try {
      const moviesList = await getMoviesByGenre('로맨스'); // 장르로 영화 조회 ex) 로맨스
      setMovies(moviesList); // 상태 업데이트
      logMovieTitles(moviesList); // 영화 제목만 로그 출력
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  };

  // 제목으로 조회 예시
  const handleFetchMoviesByTitle = async () => {
    try {
      const title = '타이타닉'; // 테스트용 제목
      const moviesList = await getMoviesByTitle(title); // 특정 제목으로 영화 검색
      setMovies(moviesList); // 상태 업데이트
      logMovieTitles(moviesList); // 영화 제목만 로그 출력
    } catch (error) {
      console.error('Error fetching movies by title:', error);
    }
  };
  
  // // data 업로드
  // const handleUploadMovies = async () => {
  //   try {
  //     await addMoviesToDB(moviesData); // Firestore에 데이터 추가
  //     console.log('Movies uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading movies:', error);
  //   }
  // };

  return (
    <Background>
      <Container>
        <Text>테스트용 페이지</Text>
        <ButtonContainer>
          <TestButton onPress={handleFetchAllMovies}>
            <ButtonText>모든 영화 조회</ButtonText>
          </TestButton>
          <TestButton onPress={handleFetchMoviesByTitle}>
            <ButtonText>제목으로 검색</ButtonText>
          </TestButton>
          <TestButton onPress={handleFetchMoviesByGenre}>
            <ButtonText>장르로 조회 </ButtonText>
          </TestButton>
        </ButtonContainer>
        {movies.map((movie) => (
           <TitleText key={movie.id}>
           {`제목: ${movie.title},`}
         </TitleText>
        
          // <StandardMovieCard
          //   key={movie.id} // 고유 key 추가
          //   moviePoster={movie.poster} // Firestore에서 가져온 URL
          //   movieTitle={movie.title}
          //   movieCategory={movie.genre.join(' #')} // 배열을 문자열로 변환
          //   movieReleaseDate={movie.release_date}
          // />
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

const TitleText = styled.Text`
  font-size: 10px;
  color: #fff;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 20px 0;
`;

const TestButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
