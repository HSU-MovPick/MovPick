import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import MovPick from "../assets/MovPick.png";
import KakaoLogo from "../assets/kakaologo.png";
import MainTicket from "../assets/mainticket.png";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KAKAO_REST_API_KEY } from "../config/kakao-api-key";

const REST_API_KEY = KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://localhost:3000/oauth"; // 리디렉션 URI

export default function Login({ navigation }) {
    const [currentUrl, setCurrentUrl] = useState(null);

    // 로그인 버튼 클릭 시 카카오 로그인 URL 생성
    const onPressButton = () => {
        console.log("Button pressed!");
        setCurrentUrl(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
        );
    };

    // 인증 코드 받아서 토큰 요청 후 사용자 정보 가져오기
    const sendCodeToBackend = async (code) => {
        console.log("Sending Authorization Code to backend...");
        try {
            // 카카오 서버에 토큰 요청
            const response = await axios.post("https://kauth.kakao.com/oauth/token", null, {
                params: {
                    grant_type: "authorization_code",
                    client_id: REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: code,
                },
            });

            const { access_token } = response.data;

            // 카카오 API로 사용자 정보 요청
            const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            console.log("User Info:", userResponse.data);

            // 사용자 정보와 토큰을 AsyncStorage에 저장
            await AsyncStorage.setItem('kakao_token', access_token);
            await AsyncStorage.setItem('user_info', JSON.stringify(userResponse.data));

            // 성공적으로 로그인 후 메인 페이지로 이동
            Alert.alert("Login Success", "Welcome to the app!");
            navigation.navigate("Main");
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert("Login Failed", "Something went wrong. Please try again.");
        }
    };

    const onShouldStartLoadWithRequest = (request) => {
        console.log("Requested URL:", request.url);
        if (request.url.startsWith(REDIRECT_URI)) {
            const code = new URL(request.url).searchParams.get("code");
            if (code) {
                sendCodeToBackend(code); // 인증 코드 백엔드로 전송
            } else {
                const error = new URL(request.url).searchParams.get("error");
                if (error) {
                    Alert.alert("Login Error", "Something went wrong: " + error);
                }
            }
            setCurrentUrl(null); // WebView 종료
        }
        return true;
    };

    // WebView에서 URL 변경 시 동작
    const onNavigationStateChange = (navState) => {
        const { url } = navState;
        console.log("Requested URL:", url);
        // 리디렉션된 URL에서 인증 코드를 추출
        if (url.startsWith(REDIRECT_URI)) {
            const code = new URL(url).searchParams.get("code");
            if (code) {
                sendCodeToBackend(code);  // 인증 코드 백엔드로 전송
            }
            setCurrentUrl(null); // WebView 종료
        }
    };

    useEffect(() => {
        const checkAsyncStorage = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys(); // 모든 키 가져오기
                const values = await AsyncStorage.multiGet(keys); // 키에 해당하는 값 가져오기
                console.log("AsyncStorage Data:", values); // 데이터 출력
            } catch (error) {
                console.error("Failed to fetch AsyncStorage data:", error);
            }
        };

        checkAsyncStorage();
    }, []);

    if (currentUrl) {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: currentUrl }}
                    javaScriptEnabled={true}  // 자바스크립트 활성화
                    domStorageEnabled={true}  // 로컬 스토리지 활성화
                    sharedCookiesEnabled={true} // 쿠키 공유 허용
                    useWebKit={true}  // WebKit 사용 안 함 (일부 환경에서 문제를 일으킬 수 있음)
                    onNavigationStateChange={onNavigationStateChange}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error("WebView Error:", nativeEvent);
                        Alert.alert("WebView Error", nativeEvent.description);
                    }}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
