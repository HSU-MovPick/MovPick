import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';
import StandardMovieCard from '../shared/components/StandardMovieCard';
import { getMoviesByGenre } from '../api/movies'; // 분리된 함수 import

export default function SituationSelectResult() {
    const navigation = useNavigation();
    const route = useRoute();
  
    // 전달된 데이터
    const { genre, selectedPerson, selectedPurpose, selectedTime } = route.params;
  
    // 영어 -> 한글 매핑
    const personMap = {
      lover: '연인',
      family: '가족',
      friend: '친구',
    };
  
    const timeMap = {
      morning: '아침',
      afternoon: '오후',
      night: '심야',
    };
  
    const purposeMap = {
      stress: '스트레스 해소',
      healing: '힐링',
      immersion: '몰입',
      emotional: '감성 충전',
      romantic: '로맨틱한 분위기 형성',
    };
  
    // 상태 관리
    const [movies, setMovies] = useState([]);
  
    // 특정 장르로 영화 조회
    const handleFetchMoviesByGenre = async () => {
      try {
        const moviesList = await getMoviesByGenre(genre); // 장르로 영화 조회
        setMovies(moviesList.slice(0, 4)); // 최대 5개만 가져오기
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    };
  
    // 컴포넌트 마운트 시 영화 조회 실행
    useEffect(() => {
      handleFetchMoviesByGenre();
    }, []);
  
    return (
      <>
        <Background>
          <RecommendMainLayout>
            <Intro>
              {personMap[selectedPerson]}과, {timeMap[selectedTime]}에, {'\n'}
              {purposeMap[selectedPurpose]}하려면
            </Intro>
            <MovieCardList>
              {movies.map((movie, index) => (
                <MovieCardWrapper key={index}>
                  <StandardMovieCard
                    moviePoster={movie.poster} // 포스터가 없으면 기본 이미지
                    movieTitle={movie.title} // 영화 제목
                    movieCategory={movie.genre.join(', ')} // 영화 장르 (배열을 문자열로 변환)
                    movieReleaseDate={movie.release_date} // 영화 개봉일
                  />
                </MovieCardWrapper>
              ))}
            </MovieCardList>
            <ButtonWrapper>
              <RecommendMainButton
                text="다른 추천 보기"
                onPress={() => navigation.navigate('SituationSelectPage')}
              />
            </ButtonWrapper>
          </RecommendMainLayout>
        </Background>
        <FooterNavigationBar />
      </>
    );
  }
  
  // 스타일 정의
  const RecommendMainLayout = styled.View`
    padding: 80px 3px;
    gap: 5px;
  `;
  
  const EmoticonWrapper = styled.View`
    align-items: center;
  `;
  
  const ButtonWrapper = styled.View`
    align-items: center;
  `;
  
  const Intro = styled.Text`
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 900;
    text-align: left;
  `;
  
  const MovieCardList = styled.ScrollView.attrs({
    horizontal: true, // 가로 스크롤 활성화
    showsHorizontalScrollIndicator: false, // 스크롤 바 숨기기
    contentContainerStyle: {
      paddingHorizontal: 20, // 양쪽 패딩 추가
    },
  })`
    margin-top: 20px;
    flex-grow: 0; /* 내부 컨텐츠 크기에 맞게 스크롤뷰 크기 제한 */
    padding: 10px 0; /* 위아래 여백 추가 */
    flex-direction: row;
  `;
  
  const MovieCardWrapper = styled.View`
    margin-right: 20px; /* 카드 간 간격 */
    align-items: center;
  `;
  