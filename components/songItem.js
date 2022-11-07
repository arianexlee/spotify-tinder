import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";

const SongItem = (props) => {
    console.log("props", props.item.album.images[0].url)
    return (
        <View style={styles.songContainer}>
            <View style={styles.songIndex}>
                <Text style={{color:"white"}}>{props.index + 1}</Text>
            </View>
            <View style={styles.albumImageContainer}>
                <Image source={{uri: props.item.album.images[0].url}} style={styles.albumImage}>
                </Image>            
            </View>
            <View style={styles.songTitleContainer}>
                <Text numberOfLines={1} style={{color:"white", paddingBottom: 2}}>{props.item.name}</Text>
                <Text numberOfLines={1} style={{color: Themes.colors.gray}}>{props.item.album.artists[0].name}</Text>
            </View>
            <View style={styles.songAlbumContainer}>
                <Text numberOfLines={1} style={{color:"white"}}>{props.item.album.name}</Text>
            </View>
            <View style={styles.songDurationContainer}>
                <Text numberOfLines={1} style={{color:"white"}}>{millisToMinutesAndSeconds(props.item.duration_ms)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    songContainer: {
      backgroundColor: Themes.colors.background,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 1,
      paddingVertical: 10,
      marginLeft: -10,
    },

    songIndex: {
        flexDirection: 'row',
        width: 40,
        // backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },

    albumImageContainer: {
        // backgroundColor: 'white',
        paddingHorizontal: 10,
    },

    albumImage: {
        width: 72,
        height: undefined, 
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    songTitleContainer: {
        width: 140,
        // backgroundColor: 'pink',
        paddingHorizontal: 10,
    },

    songAlbumContainer: {
        width: 100,
        // backgroundColor: 'blue',
        paddingHorizontal: 10,
    },

    songDurationContainer: {
        width: 60,
        // backgroundColor: 'yellow',
        paddingHorizontal: 10,
    }
});

export default SongItem;
