import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import Test from './pages/TestingPage';
import RecommendMain from './pages/RecommendMain';
import EmotionRecommendMain from './pages/EmotionRecommendMain';
import SituationRecommendMain from './pages/SituationRecommendMain';
import SituationSelectPage from './pages/SituationSelectPage';
import Login from './pages/Login';
import Main from './pages/Main';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import MapPage from './pages/MapPage';
import ChatbotWelcomePage from './pages/ChatbotWelcomePage';
import ChatbotResultPage from './pages/ChatbotResultPage';
import ChatbotChattingPage from './pages/ChatbotChattingPage';
import { db } from './firebase'; // Firebase 초기화 파일 import

// Google Maps Wrapper는 React Native에서 사용할 수 없음

const Stack = createStackNavigator();

//FireBase Firestore
console.log("Firestore instance: ", db);

// React Native에서 로딩 및 오류 메시지 처리
const render = (status) => {
  switch (status) {
    case 'LOADING':
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩중...</Text>
        </View>
      );
    case 'FAILURE':
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>에러 발생</Text>
        </View>
      );
    case 'SUCCESS':
      return null; // 성공 상태에서는 아무것도 렌더링하지 않음
    default:
      return null;
  }
};

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"
        /* <Stack.Navigator initialRouteName="MapPage" */
        screenOptions={{ headerShown: false, animationEnabled: false }}>
          <Stack.Screen name="RecommendMain" component={RecommendMain} />
          <Stack.Screen name="EmotionRecommendMain" component={EmotionRecommendMain} />
          <Stack.Screen name="SituationRecommendMain" component={SituationRecommendMain}/>
          <Stack.Screen name="SituationSelectPage" component={SituationSelectPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="MovieList" component={MovieList} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="MapPage" component={MapPage} />
          <Stack.Screen name="ChatbotWelcomePage" component={ChatbotWelcomePage} />
          <Stack.Screen name="ChatbotChattingPage" component={ChatbotChattingPage} />
          <Stack.Screen name="ChatbotResultPage" component={ChatbotResultPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
