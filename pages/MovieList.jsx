import React, { useState } from "react";
import styled from "styled-components/native";
import Background from "../shared/components/PopcornBackground";
import SearchButtonImg from "../assets/searchButton.png";
import SearchClearImg from "../assets/clearButton.png";
import MovieBlock from "../entities/MovieList/ui/MovieBlock";
import DevilImg from "../assets/devil.png";

export default function MovieList() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [isExist, setIsExist] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false); 

  const genres = ["전체", "액션", "스릴러", "코미디", "로맨스", "SF", "판타지", "공포", "애니메이션"];

  const [movies, setMovies] = useState([
    {
      image: DevilImg,
      title: "The Devil Wears Prada",
      synopsis: "A young woman lands a job as an assistant to a powerful fashion magazine editor, navigating a world of high fashion, demanding bosses, and her own aspirations.",
    }
  ]);

  const handleClearText = () => {
    setSearchText("");
    setIsSearchClicked(false);
  };

  const handleSearchButtonPress = () => {
    setIsSearchClicked(true);
  };

  return (
    <Background isExist={isExist}>
      <SearchWrap>
        <DropdownWrapper>
          <Button onPress={() => setDropdownVisible(!dropdownVisible)}>
            <ButtonText>{selectedGenre}</ButtonText>
            <Arrow>▼</Arrow>
          </Button>
          {dropdownVisible && (
            <Dropdown>
              {genres.map((genre, index) => (
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
            onChangeText={(text) => setSearchText(text)}  // 텍스트가 변경되면 상태 업데이트
          />
          <SearchButton onPress={isSearchClicked ? handleClearText : handleSearchButtonPress}>
            <SearchImage source={isSearchClicked && searchText ? SearchClearImg : SearchButtonImg} />
          </SearchButton>
        </SearchContainer>
      </SearchWrap>

      <MovieBlockWrap>
        {movies.map((e, i) => <MovieBlock key={i} image={e.image} title={e.title} content={e.synopsis} />)}
      </MovieBlockWrap>
    </Background>
  );
}

const SearchWrap = styled.View`
  width: 100%;
  height: 41px;
  padding-left: 13px;
  padding-right: 13px;
  margin-top: 73px;
  flex-direction : row;
`;

const DropdownWrapper = styled.View`
  position: relative;
`;

const Button = styled.TouchableOpacity`
  width: 90px;
  height: 41px;
  background-color: #C73659;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-right : 6px;
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
  padding-left: 0;
  padding-right: 0;
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

const Dropdown = styled.View`
  position: absolute;
  top: 50px;
  left: 0;
  width: 93%;
  background-color: #ffffff;
  border-radius: 15px;
  elevation: 5;
  z-index : 2;
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
  margin-top : 12px;
`;