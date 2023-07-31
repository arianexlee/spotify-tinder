import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/homeScreen';
import SwipeScreen from './screens/swipeScreen';
import ChoosePlaylistScreen from './screens/choosePlaylistScreen';
import { useState, useEffect, createContext, useContext} from "react";


const Stack = createStackNavigator();
export const recsContext = createContext(null)
export const savedRecsContext = createContext(null)
export const userPlaylistsContext = createContext(null)
export const popupVisibleContext = createContext(null)





export default function App() {
  const [recs, setRecs] = useState([])
  const [savedRecs, setSavedRecs] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  return (
    <popupVisibleContext.Provider value ={{isPopupVisible, setIsPopupVisible}}>
    <userPlaylistsContext.Provider value={{userPlaylists, setUserPlaylists}}>
    <recsContext.Provider value={{recs, setRecs}}>
    <savedRecsContext.Provider value={{savedRecs, setSavedRecs}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = 'homeScreen' 
          component={HomeScreen}  
          options={{headerShown: false}}
          />
          <Stack.Screen name = 'swipeScreen' 
          component={SwipeScreen}         
          options={{headerShown: false}}
          />
          <Stack.Screen name = 'choosePlaylistScreen' 
          component={ChoosePlaylistScreen}
          options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </savedRecsContext.Provider>
    </recsContext.Provider>
    </userPlaylistsContext.Provider>
    </popupVisibleContext.Provider>
  );
}
