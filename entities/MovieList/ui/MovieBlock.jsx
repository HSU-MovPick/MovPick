import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import DefaultImage from "../../../assets/movie-default.png";

export default function MovieBlock({ image, title, content, onPress }) {
  return (
    <MainLayout onPress={onPress}>
      <Poster source={image ? { uri: image } : DefaultImage} />
      <InfoWrap>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </InfoWrap>
    </MainLayout>
  );
}

const MainLayout = styled.Pressable`
    width: 100%;
    height: 137px;
    border-radius: 15px;
    background-color: #C73659;
    z-index: 1;
    flex-direction: row;
    gap: 6px;
    padding: 10px 9px;
    overflow: hidden;
    margin-bottom : 12px;
`;

const Poster = styled.Image`
    resize-mode: contain;
    width: 100px;
    height: 115px;
    border-radius: 10px;
    flex-shrink: 0;
`;

const InfoWrap = styled.View`
    flex: 1;
    overflow: hidden;
`;

const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: white;
    margin-top : 4px;
`;

const Content = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: white;
    flex-shrink: 1;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top : 6px;
`;