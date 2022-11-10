import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { WebView } from 'react-native-webview';


const DetailScreen = ({route}) => {
    console.log(route.params.url)
    return (
        <WebView source={{ uri: route.params.url}} />
    );
}


export default DetailScreen;
