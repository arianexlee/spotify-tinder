import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';




export const addTrack = (playlistID, trackURI, token) => {

    const encodedTrackURI = encodeURIComponent(trackURI)

    axios.post('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
      uris: [trackURI]
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    .then(response => {
      // console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };



export default function PlaylistItem(props) {
    const navigation = useNavigation();

    function whenAdded(id, songURI, token) {
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