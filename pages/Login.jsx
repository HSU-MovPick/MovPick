import React, { useState } from "react";
import { View, Alert } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import MovPick from "../assets/MovPick.png";
import KakaoLogo from "../assets/kakaologo.png";
import MainTicket from "../assets/mainticket.png";
import axios from "axios";

const REST_API_KEY = "40a65c421ba8c4f7e8fed8a8937e3c77";
const REDIRECT_URI = "https://movpick.com/oauth";

export default function Login({ navigation }) {
    const [currentUrl, setCurrentUrl] = useState(null);

    const onPressButton = () => {
        console.log("Button pressed!");
        setCurrentUrl(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
        );
    };

    const sendCodeToBackend = async (code) => {
        console.log("Sending Authorization Code to backend...");
        try {
            const response = await axios.post("https://your-backend-url.com/kakao-login", {
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: REST_API_KEY,
            });

            if (response.status === 200) {
                console.log("Backend Response:", response.data);
                Alert.alert("Login Success", `Welcome, ${response.data.nickname}!`);
                navigation.navigate("Main");
            } else {
                console.error("Backend Error:", response.status, response.data);
                Alert.alert("Login Failed", "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            Alert.alert("Network Error", "Failed to communicate with the server.");
        }
    };

    if (currentUrl) {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: currentUrl,
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    sharedCookiesEnabled={true}
                    useWebKit={true}
                    onNavigationStateChange={(navState) => {
                        const { url } = navState;
                        console.log("Current URL:", url);

                        if (url.startsWith(REDIRECT_URI)) {
                            console.log("Redirected URL:", url);
                            const code = new URL(url).searchParams.get("code");
                            if (code) {
                                console.log("Authorization Code:", code);
                                sendCodeToBackend(code);
                            }
                            setCurrentUrl(null); // WebView 종료
                        }
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error("WebView Error:", nativeEvent);
                        Alert.alert("WebView Error", nativeEvent.description);
                    }}
                />
            </View>
        );
    }

    return (
        <MainLayout>
            <MovPickImg source={MovPick} />
            <LogoImg source={Logo} />

            <KakaoLoginButton onPress={onPressButton}>
                <KakaoLogoImg source={KakaoLogo} />
                <StyledText>카카오 로그인</StyledText>
            </KakaoLoginButton>

            <MainTicketImg source={MainTicket} />
        </MainLayout>
    );
}

const MainLayout = styled.View`
  height: 100%;
  background-color: #a91d3a;
  justify-content: center;
  align-items: center;
`;

const MovPickImg = styled.Image`
  width: 300px;
  height: 80px;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const LogoImg = styled.Image`
  width: 197px;
  height: 197px;
  margin-bottom: 30px;
`;

const KakaoLogoImg = styled.Image`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const StyledText = styled.Text`
  font-weight: 700;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  width: 301px;
  height: 50px;
  background-color: #fee500;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 40px;
`;

const MainTicketImg = styled.Image`
  width: 331px;
  height: 261px;
`;
