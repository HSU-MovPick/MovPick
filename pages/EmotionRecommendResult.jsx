import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';
import StandardMovieCard from '../shared/components/StandardMovieCard';
import { getMoviesByGenre } from '../api/movies'; // 감정 기반 추천 함수 import

export default function EmotionRecommendResult() {
  const navigation = useNavigation();
  const route = useRoute();

  // 전달된 데이터
  const { emotion } = route.params;

  // 감정을 장르로 매핑하는 함수
  const mapEmotionToGenre = (emotion) => {
    switch (emotion) {
      case '놀람':
        return '드라마'; // 놀람 → 힐링
      case '슬픔':
        return '코미디'; // 슬픔 → 코미디
      case '기쁨':
        return '로맨스'; // 기쁨 → 로맨스
      case '분노':
        return '액션'; // 분노 → 액션
      default:
        return '코미디'; // 기본
    }
  };

  const [movies, setMovies] = useState([]);

  // 영화 목록을 가져오는 함수
  const handleFetchMoviesByEmotion = async () => {
    const genre = mapEmotionToGenre(emotion); // 감정을 장르로 매핑
    try {
      const moviesList = await getMoviesByGenre(genre); // 장르를 사용해 영화 조회
      setMovies(moviesList.slice(0, 5)); // 최대 4개만 가져오기
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 영화 조회
  useEffect(() => {
    handleFetchMoviesByEmotion();
  }, []);

  return (
    <>
      <Background>
        <RecommendMainLayout>
          <Intro>
            "{emotion}"일 때 {"\n"}추천하는 영화
          </Intro>
          <MovieCardList>
            {movies.map((movie, index) => (
              <MovieCardWrapper key={index}>
                <StandardMovieCard
                  moviePoster={movie.poster || '기본 이미지 경로'}
                  movieTitle={movie.title}
                  movieCategory={movie.genre?.join(', ') || '장르 정보 없음'}
                  movieReleaseDate={movie.release_date || '개봉일 정보 없음'}
                />
              </MovieCardWrapper>
            ))}
          </MovieCardList>
          <ButtonWrapper>
            <RecommendMainButton
              text="다른 감정 추천 보기"
              onPress={() => navigation.navigate('EmotionRecommendPic')} // 감정 선택 페이지로 이동
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
