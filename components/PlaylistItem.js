import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, createContext, useContext} from "react";
import { popupVisibleContext, recsContext, savedRecsContext, userPlaylistsContext } from "../App";
import { globalTokenContext } from "../App";
import axios from 'axios';


// import { addTrack } from "./apiOptions";



export const addTrack = (playlistID, trackURI, token) => {
    // console.log("HERE")
    // console.log("playlistID: ", playlistID)
    const encodedTrackURI = encodeURIComponent(trackURI)
    // console.log("trackURI: ", trackURI)
    // console.log("token: ", token)
    // console.log('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks')
    axios.post('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
      uris: [trackURI]
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };



export default function PlaylistItem(props) {
  // const {isPopupVisible, setIsPopupVisible} = useContext(popupVisibleContext)
    // console.log("Props:", props.item.id)
    // console.log("songURI: ", props.songURI)
    // console.log("TOKEN: ", props.token)
    const navigation = useNavigation();

    function whenAdded(id, songURI, token) {
      // setIsPopupVisible(true)
      addTrack(id, songURI, token)
      navigation.navigate('homeScreen')
    }

    return(
        <Pressable onPress={() => whenAdded(props.item.id, props.songURI, props.token)}>
            <View style={styles.container}>
                <Text style={styles.lgBoldBodyText}>{props.item.name}</Text>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 24, 
      paddingVertical: 12,
    },

    playlistAndImgContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    imgContainer: {
        width: 48,
        height: 48,
        marginRight: 12,
        backgroundColor: 'purple'
    },

    playlistImage: {
        width: 48,
        height: undefined, 
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    playlistTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    lgRegBodyText: {
        fontSize: 17,
        color: 'black'
    },

    mdRegBodyText: {
        fontSize: 15,
        color: 'black'
    },

    lgBoldBodyText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
})