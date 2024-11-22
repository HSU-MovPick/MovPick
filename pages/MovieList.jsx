import styled from "styled-components"
import Background from '../shared/components/StandardBackground';
import Popcorn from '../assets/popcorn.png'


export default function MovieList() {
    return(
        <Background>
            <MainLayout>
                <PopcornImg source={Popcorn}/>
            </MainLayout>
        </Background>
    );
}

const Text1 = styled.Text`
color : white;
font-weight : 700;
`

const PopcornImg = styled.Image`
width : 195px;
height : 195px;
margin-bottom : 20px;
`

const MainLayout = styled.View`
height : 24%;
justify-content : center;
align-items : center;
flex-direction : row;
`