import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import BackbuttonImg from "../assets/BackButton.png";

import FooterNavigationBar from "../shared/components/FooterNavigationBar"

export default function MovieDetail({ route }) {
  const navigation = useNavigation();
  const { title, poster, description, actors, duration, genre, rating, release_date } = route.params;

  return (
    <>
      <MainLayout>
        <Wrap>
          <TitleSection>
            <BackButton onPress={() => navigation.goBack()}>
              <BackButtonImg source={BackbuttonImg} />
            </BackButton>
            <TitleWrap>
              <Title>{title}</Title>
            </TitleWrap>
          </TitleSection>
          <DetailSection>
            <MovieTitle>영화정보</MovieTitle>
            <InfoWrap>
              <Poster source={poster ? { uri: poster } : require("../assets/movie-default.png")} />
              <InfoDetail1>
                <BoldText>출연진:</BoldText> {actors.join(", ")}{"\n"}{"\n"}
                <BoldText>상영 시간:</BoldText> {duration}분{"\n"}{"\n"}
                <BoldText>장르:</BoldText> {genre.join(", ")}{"\n"}{"\n"}
                <BoldText>관람 등급:</BoldText> {rating}{"\n"}{"\n"}
                <BoldText>개봉일:</BoldText> {release_date}
              </InfoDetail1>
            </InfoWrap>
            <InfoDetail2>{description}</InfoDetail2>
          </DetailSection>
        </Wrap>
      </MainLayout>
      {/* 하단 네비게이션 바(푸터) */}
      <FooterNavigationBar />
    </>
  );
}

const MainLayout = styled.View`
  justify-content: center;
  width: 100%;
  padding: 48px 12px;
`;

const Wrap = styled.View`
  height: 100%;
  background-color: black;
  border-radius: 24px;
`;

const TitleSection = styled.View`
  padding: 12px;
  height: 160px;
  background-color: #c73659;
  border-radius: 24px 24px 0 0;
`;

const BackButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  margin-top: 10px;
`;

const BackButtonImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin-top: 35px;
`;

const DetailSection = styled.View`
  padding: 24px 16px;
`;

const Poster = styled.Image`
  resize-mode: contain;
  width: 130px;
  height: 200px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-right: 13px;
`;

const MovieTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 11px;
  margin-left: 7px;
`;

const InfoWrap = styled.View`
  width: 199px;
  flex-direction: row;
  margin-bottom: 18px;
`;

const InfoDetail1 = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
  margin-top: 27px;
`;

const InfoDetail2 = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`;

const BoldText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: white;
`;