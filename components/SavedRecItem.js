import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect, createContext, useContext} from "react";
import { recsContext, savedRecsContext } from "../App";

export default function SavedRecItem(props) {
    const navigation = useNavigation();
    const {savedRecs, setSavedRecs} = useContext(savedRecsContext)
    // console.log("SavedRecs List:", savedRecs)
    // console.log("SavedRecProps: ", props)

    function adding(uri, token, currentSavedSong){
        const index = savedRecs.indexOf(currentSavedSong);
        navigation.navigate('choosePlaylistScreen', {songURI: uri, token: token})
        // if (index > -1) {
        //     setSavedRecs(savedRecs.splice(index, 1))
        // }
    }

    return(
        <View style={styles.container}>
            <View style={styles.songAndImgContainer}>
                <View style={styles.imgContainer}>
                    <Image source={{uri: props.item.album.images[0].url}} style={styles.songImage}>
                    </Image>
                </View>
                <View style={styles.songTextContainer}>
                    <Text numberOfLines={1} style={styles.lgRegBodyText}>
                        {props.item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.mdRegBodyText}>
                        {props.item.album.artists[0].name}
                    </Text>
                </View>
            </View>
            <View>
            {/* navigation.navigate('choosePlaylistScreen', {songURI: props.item.uri, token: props.token}) */}
                <Pressable onPress={() => adding(props.item.uri, props.token, props.item)}>
                    <View style={styles.addButton}>
                        <Text style={styles.smRegBodyText}>ADD TO PLAYLIST</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18, 
    },

    songAndImgContainer: {
        display: 'flex',
        flexDirection: 'row',

    },

    imgContainer: {
        width: 48,
        height: 48,
        marginRight: 12,
        backgroundColor: 'purple'
    },

    songImage: {
        width: 48,
        height: undefined, 
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    songTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '48%',
    },

    lgRegBodyText: {
        fontSize: 17,
        color: 'white',
        marginBottom: 2,
    },

    mdRegBodyText: {
        fontSize: 15,
        color: '#B3B3B3'
    },

    smRegBodyText: {
        fontSize: 13,
        color: "white",
    },

    addButton: {
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 5,
        backgroundColor: '#4E4E4E',
        borderRadius: 16,
    }
})