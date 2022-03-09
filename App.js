import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import Screen2 from './Screen2';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: '', headerShown: false }}>
        <Stack.Screen name={'Simay'} component={LoginPage}></Stack.Screen>
        <Stack.Screen name={'two'} component={Screen2}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
