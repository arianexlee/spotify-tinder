import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { useContext} from "react";
import { userPlaylistsContext } from "../App";
import PlaylistItem from "../components/PlaylistItem";


export default function ChoosePlaylistScreen({navigation, route}) {
    const {userPlaylists} = useContext(userPlaylistsContext)
        const PlaylistList = ({userPlaylists}) => {
        return (
          <FlatList
            data={userPlaylists}
            renderItem={({item}) => <PlaylistItem item = {item} songURI= {route.params.songURI} token= {route.params.token}/>}
            keyExtractor={(item) => item.id}
          />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContentContainer}>
                    <Pressable onPress={() => navigation.navigate('homeScreen')}>
                        <Image source={require('../assets/backButton.png')} style={styles.backButtonImg}>
                        </Image>
                    </Pressable>
                    <Text style={styles.mdBodyBold}>Add to Playlist</Text>
                    <View style={styles.headerSpacer}></View>
                </View>
            </View>
            <View style={styles.playlistListContainer}>
                <PlaylistList userPlaylists={userPlaylists}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Themes.colors.background,
      justifyContent: "start",
      alignItems: "start",
      padding: 0,
      margin: 0,
      width: '100%',
      height: '100%',
    },

    header: {
        width: '100%',
        padding: 16,
    },

    headerContentContainer: { 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    backButtonImg: {
        width: 24,
        height: 24,
    },

    mdBodyBold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },

    headerSpacer: {
        width: 24, 
        height: 24,
    },

    playlistListContainer:{
        width: '100%',
    }
})