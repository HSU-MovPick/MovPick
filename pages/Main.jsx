import styled from "styled-components"
import MovPick2 from '../assets/MovPick2.png'
import Emoticon4 from '../assets/emoticon4.png'
import Emoticon5 from '../assets/emoticon5.png'
import Emoticon3 from '../assets/emoticon3.png'
import Background from '../shared/components/StandardBackground';


import { useNavigation } from "@react-navigation/native"
import FooterNavigationBar from "../shared/components/FooterNavigationBar"
export default function Main() {
    const navigation = useNavigation()
    return (
        <>
        <Background>
            <MovPickImg2 source={MovPick2} />
            <MainLayout>
                <EmoticonImg1 source={Emoticon4} />
                <MainLayout2>
                    <Text>궁금한 영화 제목이 있나요?</Text>
                    <Text>'뭅에게 질문하기' 기능을 사용해보세요!</Text>
                    <Button onPress={() => navigation.navigate('ChatbotPage')}>
                        <ButtonText>챗봇 페이지로 이동</ButtonText>
                    </Button>
                </MainLayout2>
            </MainLayout>

            <MainLayout>
                <MainLayout2>
                    <Text>어떤 영화를 봐야할지 모르겠나요?</Text>
                    <Text>뭅이 감정에 따른 영화를 추천해드려요!</Text>
                    <Button><Text>영화 추천 받으러 가기</Text></Button>
                </MainLayout2>
                <EmoticonImg2 source={Emoticon5} />
            </MainLayout>

            <MainLayout>
                <EmoticonImg3 source={Emoticon3} />
                <MainLayout2>
                    <Text>근처 영화관 정보가 궁금하신가요?</Text>
                    <Text>뭅에게 맡겨주세요~</Text>
                    <Button><Text>근처 영화관 보러 가기</Text></Button>
                </MainLayout2>
            </MainLayout>
        </Background>
        {/* 하단 네비게이션 바(푸터) */}
        <FooterNavigationBar />
        </>
    );
}

const MovPickImg2 = styled.Image`
width : 320px;
height : 80px;
margin-bottom : 2px;
`
const EmoticonImg1 = styled.Image`
width : 121px;
height : 121px;
margin-bottom : 80px;
margin-top : 15%;
`

const EmoticonImg2 = styled.Image`
width : 118px;
height : 118px;
margin-bottom : 80px;
margin-top : 15%;
`

const EmoticonImg3 = styled.Image`
width : 118px;
height : 118px;
margin-bottom : 80px;
margin-top : 20%;
`

const Button = styled.TouchableOpacity`
width : 182px;
height : 47px;
background-color : #A91D3A;
border-radius : 10px;
justify-content : center;
align-items : center;
margin-top : 5%;
`

const MainLayout = styled.View`
height : 24%;
justify-content : center;
align-items : center;
flex-direction : row;
`

const MainLayout2 = styled.View`
height : 24%;
justify-content : center;
`

const Text = styled.Text`
color : white;
font-weight : 700;
`
const ButtonText = styled.Text`
  color: #FFFFFF; 
  font-size: 14px; 
  font-weight: bold; 
`;