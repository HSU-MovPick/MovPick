import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import BackbuttonImg from "../assets/BackButton.png";

export default function MovieDetail({ title, poster, detail, content }) {

    const navigation = useNavigation();

    function onBackPress() {
        navigation.goBack();
    }

    return (

        <MainLayout>
            <Wrap>
                <TitleSection>
                    <BackButton onPress={()=>onBackPress()}>
                        <BackButtonImg source={BackbuttonImg} />
                    </BackButton>
                    <TitleWrap>
                        <Title>{title}</Title>
                    </TitleWrap>

                </TitleSection>
                <DetailSection>
                    <MovieTitle>
                        영화정보
                    </MovieTitle>
                    <InfoWrap>
                        <Poster source={poster} />
                        <InfoDetail>{detail}</InfoDetail>
                    </InfoWrap>

                    <InfoDetail>{content}</InfoDetail>
                </DetailSection>
            </Wrap>
        </MainLayout>
    );
}

const MainLayout = styled.View`
justify-content: center;
width: 100%;
padding: 48px 12px;
`

const Wrap = styled.View`
height: 100%;
background-color: black;
border-radius: 24px;

`

const TitleSection = styled.View`
padding: 12px;
height: 160px;
background-color: #C73659;
border-radius: 24px 24px 0 0;
`

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
`
const Title = styled.Text`
color: white;
font-weight: 600;
font-size: 28px;
`

const DetailSection = styled.View`
padding: 24px 16px;
`

const Poster = styled.Image`
    resize-mode: contain;
    width: 130px;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    margin-right: 20px;
`;

const MovieTitle = styled.Text`
color: white;
font-size: 20px;
font-weight: 500;
margin-bottom: 24px;
font-weight: bold;
`

const InfoWrap = styled.View`
flex-direction: row;
margin-bottom: 48px;
`

const InfoDetail = styled.Text`
color: white;
font-size: 12px;
font-weight: 500;
`