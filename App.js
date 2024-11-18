// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './pages/TestingPage';
import RecommendMain from './pages/RecommendMain';
import EmotionRecommendMain from './pages/EmotionRecommendMain';
import SituationRecommendMain from './pages/SituationRecommendMain';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="RecommendMain"
        screenOptions={{ headerShown: false, animationEnabled: false }}>
          <Stack.Screen name="RecommendMain" component={RecommendMain} />
          <Stack.Screen name="EmotionRecommendMain" component={EmotionRecommendMain} />
          <Stack.Screen name="SituationRecommendMain" component={SituationRecommendMain}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
