import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './homescreen';
import SplashScreen from './splashscreen';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com/graphql"
})

const App = () => {
  const Stack = createNativeStackNavigator()

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Splashscreen' component={SplashScreen} />
          <Stack.Screen name='homescreen' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </ApolloProvider>

  )
}

export default App

const styles = StyleSheet.create({})