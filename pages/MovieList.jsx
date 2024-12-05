import React, { useState, useEffect, useCallback } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import Background from "../shared/components/PopcornBackground";
import SearchButtonImg from "../assets/searchButton.png";
import SearchClearImg from "../assets/clearButton.png";
import MovieBlock from "../entities/MovieList/ui/MovieBlock";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import { getMoviesByTitleAndGenre, getMoviesByGenre, getAllMovies } from "../api/movies";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default function MovieList() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [isExist, setIsExist] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  const genres = ["전체", "액션", "스릴러", "코미디", "로맨스", "SF", "판타지", "공포", "애니메이션"];

  const fetchMovies = async (text) => {
    try {
      let moviesData = [];
      if (text) {
        // Firestore에서 모든 영화를 가져오고 제목으로 필터링
        const allMovies = await getAllMovies();
        moviesData = allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(text.toLowerCase()) // 대소문자 무시
        );
      } else if (selectedGenre !== "전체") {
        moviesData = await getMoviesByGenre(selectedGenre);
      } else {
        moviesData = await getAllMovies();
      }
  
      const updatedMovies = moviesData.map((movie) => ({
        ...movie,
        image: movie.poster,
        content: movie.description
      }));
  
      setMovies(updatedMovies);
  
      // 데이터 존재 여부에 따라 isExist 업데이트
      setIsExist(updatedMovies.length > 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };  

  // 디바운스된 fetchMovies 함수 생성
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 300), [selectedGenre]);

  // 검색 텍스트가 변경될 때마다 호출
  useEffect(() => {
    debouncedFetchMovies(searchText);
  }, [searchText, debouncedFetchMovies]);

  return (
    <>
      <Background isExist={isExist}>
        <SearchWrap>
          <DropdownWrapper>
            <Button onPress={() => setDropdownVisible(!dropdownVisible)}>
              <ButtonText>{selectedGenre}</ButtonText>
              <Arrow>▼</Arrow>
            </Button>
            {dropdownVisible && (
              <Dropdown>
                {["전체", "액션", "스릴러", "코미디", "로맨스", "SF", "판타지", "공포", "애니메이션"].map((genre, index) => (
                  <DropdownItem
                    key={index}
                    style={index === genres.length - 1 ? { borderBottomWidth: 0 } : {}}
                    onPress={() => {
                      setSelectedGenre(genre);
                      setDropdownVisible(false);
                    }}
                  >
                    <DropdownText>{genre}</DropdownText>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </DropdownWrapper>
          <SearchContainer>
            <SearchInput
              placeholder="영화를 검색해보세요!"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <SearchButton onPress={() => setSearchText("")}>
              <SearchImage source={SearchClearImg} />
            </SearchButton>
          </SearchContainer>
        </SearchWrap>

        <ScrollView>
          <MovieBlockWrap>
            {movies.map((movie, index) => (
              <MovieBlock key={index} image={movie.image} title={movie.title} content={movie.content} />
            ))}
          </MovieBlockWrap>
        </ScrollView>
      </Background>
      <FooterNavigationBar />
    </>
  );
}

// 스타일 컴포넌트
const SearchWrap = styled.View`
  width: 100%;
  height: 41px;
  padding-left: 13px;
  padding-right: 13px;
  margin-top: 73px;
  flex-direction: row;
`;

const DropdownWrapper = styled.View`
  position: relative;
`;

const Button = styled.TouchableOpacity`
  width: 90px;
  height: 41px;
  background-color: #c73659;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-right: 6px;
  flex-shrink: 0;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Arrow = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-left: 5px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  height: 100%;
  flex: 1;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding: 0 15px;
`;

const SearchButton = styled.TouchableOpacity`
  height: 100%;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

const SearchImage = styled.Image`
  width: 26px;
  height: 26px;
`;

const DefaultImage = styled.Image`
`

const Dropdown = styled.View`
  position: absolute;
  top: 50px;
  left: 0;
  width: 93%;
  background-color: #ffffff;
  border-radius: 15px;
  elevation: 5;
  z-index: 2;
`;

const DropdownItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DropdownText = styled.Text`
  font-size: 14px;
  color: #000000;
  font-weight: bold;
`;

const MovieBlockWrap = styled.View`
  padding-left: 13px;
  padding-right: 13px;
  margin-top: 12px;
`;


