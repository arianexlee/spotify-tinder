import React from "react";
import { StyleSheet, Image, SafeAreaView, Text, Pressable, FlatList, View } from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import SongItem from "./components/songItem";
import reactDom from "react-dom";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './components/homeScreen';
import DetailScreen from './components/detailScreen';
import PreviewScreen from './components/previewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'homeScreen' component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name = 'detailScreen' 
        component={DetailScreen} 
        options={
          { title: 'Song Details', 
          headerStyle: {
            backgroundColor: Themes.colors.background,
          },
          headerTintColor: Themes.colors.spotify,
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Themes.colors.white
          }}
        }/>
        <Stack.Screen name = 'previewScreen' 
        component={PreviewScreen}
        options={
          { title: 'Song Preview', 
          headerStyle: {
            backgroundColor: Themes.colors.background,
          },
          headerTintColor: Themes.colors.spotify,
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Themes.colors.white
          }}
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
