import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function SongItem(props) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('detailScreen', {url: props.item.external_urls.spotify})}>
            <View style={styles.songContainer}>
                <View style={styles.songIndex}>
                    <Pressable onPress={() => navigation.navigate('previewScreen', {url: props.item.preview_url})}>
                        <AntDesign name="play" size={20} color={Themes.colors.spotify} />
                    </Pressable>
                    {/* <Text style={{color:"white"}}>{props.index + 1}</Text> */}
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
        </Pressable>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },

    albumImageContainer: {
        paddingHorizontal: 8,
    },

    albumImage: {
        width: 72,
        height: undefined, 
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    songTitleContainer: {
        width: 140,
        paddingHorizontal: 8,
    },

    songAlbumContainer: {
        width: 100,
        paddingHorizontal: 10,
    },

    songDurationContainer: {
        width: 60,
        paddingHorizontal: 8,
    }
});

// export default SongItem;
