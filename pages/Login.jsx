import styled from "styled-components"
import Logo from '../assets/logo.png'
import MovPick from '../assets/MovPick.png'
import KakaoLogo from '../assets/kakaologo.png'
import MainTicket from '../assets/mainticket.png'

export default function Login() {
    return (

        <MainLayout>
            
            <MovPickImg source={MovPick} />
            <LogoImg source={Logo} />

            <KakaoLoginButton onPress={()=>onPressButton()}>
                <KakaoLogoImg source={KakaoLogo}/>
                <StyledText>카카오 로그인</StyledText>
            </KakaoLoginButton>


            <MainTicketImg source={MainTicket} />

            {/* 
        
                justify-content : center;  -> 세로선 가운데 정렬
                align-items : center; -> 가로선 가운데 정렬 
            */}

        </MainLayout>
    )
}
const MainLayout = styled.View`
height : 100%; 
background-color : #A91D3A;
justify-content : center;
align-items : center;
`
const MovPickImg = styled.Image`
width : 300px;
height : 80px;
margin-top : 50px;
margin-bottom : 40px;
`
const LogoImg = styled.Image`
width : 197px;
height : 197px;
margin-bottom : 30px;
`

const KakaoLogoImg = styled.Image`
width : 18px;
height : 18px;
margin-right : 10px;
`
const StyledText = styled.Text`
font-weight : 700;
`

const KakaoLoginButton = styled.TouchableOpacity`
width : 301px;
height : 50px;
background-color : #FEE500;
border-radius : 10px;
display : flex;
justify-content : center;
align-items : center;
flex-direction : row;
margin-bottom : 40px;
`

const MainTicketImg = styled.Image`
width : 331px;
height : 261px;
`