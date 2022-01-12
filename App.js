import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Loginpage from './screens/Loginpage';
import Signuppage from './screens/Signuppage';

import MainTabScreen from './screens/Dashboard';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
     
      
      
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="Dashboard" component={MainTabScreen} options={{
          
          headerStyle: {
            backgroundColor: '#262927',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:24
          },
         headerShown: false 
        }}/>
      <Stack.Screen name="Signup" component={Signuppage} />
      <Stack.Screen name="Home" component={HomeScreen} />
     
     

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;