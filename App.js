// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './pages/TestingPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Test"
        screenOptions={{ headerShown: false, animationEnabled: false }}>
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
