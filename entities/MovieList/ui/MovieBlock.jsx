import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";

export default function MovieBlock({ image, title, content }) {

    const navigation = useNavigation()

    function onBlockClick() {
        navigation.navigate('MovieDetail');
    }
    return (
        <MainLayout onPress={onBlockClick}>
            <Poster source={image}></Poster>
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
    gap: 9px;
    padding: 19px 16px;
    overflow: hidden;
    margin-bottom : 12px;
`;

const Poster = styled.Image`
    resize-mode: contain;
    width: 70px;
    height: 100px;
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
`;

const Content = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: white;
    flex-shrink: 1;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top : 4px;
`;