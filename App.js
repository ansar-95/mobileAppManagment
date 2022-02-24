import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Ajouter from './Ajouter';
import { Provider } from 'react-redux';
import Login from './Login';
import {createStore} from 'redux'
import rootReducer from './reducers'
import CandidatureDetails from './CandidatureDetails';

const store = createStore(
  rootReducer
)
const Stack = createNativeStackNavigator();





export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Connexion"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ajouter" component={Ajouter} />
        <Stack.Screen name="Details" component={CandidatureDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
