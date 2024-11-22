// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './pages/TestingPage';
import Login from './pages/Login'
import Main from './pages/Main';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Login"
        screenOptions={{ headerShown: false, animationEnabled: false }}>
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
