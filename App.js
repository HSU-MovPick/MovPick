// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './pages/TestingPage';
import ChatbotPage from './pages/ChatbotPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="ChatbotPage"
        // <Stack.Navigator initialRouteName="Test"
        screenOptions={{ headerShown: false, animationEnabled: false }}>
          <Stack.Screen name="Test" component={Test} />
          {/* name = "Test-> 이게 컴포넌트의 주소" */}
          <Stack.Screen name="ChatbotPage" component={ChatbotPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
