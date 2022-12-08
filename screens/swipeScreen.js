import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Image, FlatList} from "react-native";
import { Themes } from "../assets/Themes";
import { WebView } from 'react-native-webview';
import CardsSwipe from 'react-native-cards-swipe';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, createContext, useContext} from "react";
import { recsContext, savedRecsContext } from "../App";
import { Audio } from "expo-av"
import { LinearGradient } from 'expo-linear-gradient';





const SwipeScreen = ({navigation}) => {
    const {recs} = useContext(recsContext)
    const {setSavedRecs} = useContext(savedRecsContext)
    // const [currentSong, setCurrentSong] = useState(recs[0])
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [songSound, setSongSound] = useState(recs[currentSongIndex].preview_url)
    const [songCount, setSongCount] = useState(1)

    // console.log("Saved Recs: ", savedRecs)
    // console.log("Current Song: ", currentSong)

    function onRight(index){
        setSongCount(songCount + 1)
        setSavedRecs(current => [...current, recs[index]])
        setCurrentSongIndex(currentSongIndex + 1)
        pause(currentPlayer)
        // console.log("Index:", index)
        console.log("CurrentSongIndex:", currentSongIndex)
        console.log("CurrentSongIndex:", recs[currentSongIndex + 1].preview_url)
        console.log("Old Song Sound:", songSound)
        console.log("The Supposed new songSound", recs[currentSongIndex + 1].preview_url)
        // setSongSound(recs[currentSongIndex + 1].preview_url)
        // console.log("New Song Sound:", songSound)
        play(recs[currentSongIndex + 1].preview_url)
    }

    function onLeft(index){
        setSongCount(songCount + 1)
        setCurrentSongIndex(currentSongIndex + 1)
        pause(currentPlayer)
        // setSongSound(recs[currentSongIndex + 1].preview_url)
        play(recs[currentSongIndex + 1].preview_url)
    }

    useEffect(() => {
        console.log("First Play URL:", songSound)
        play(songSound);
    }, 
    [])

    
    async function play(songSound) {
        try {
          // Load the track into an audio player
          const player = new Audio.Sound();
          setCurrentPlayer(player)
          await player.loadAsync({ uri: songSound });
    
          // Play the track
          await player.playAsync();
        } catch (err) {
          console.log(err);
        }
    }
    
    async function pause(player) {
        try {
          // Pause the track
          await player.pauseAsync();
        } catch (err) {
          console.log(err);
        }
    }

    function navgiateBack() {
        pause(currentPlayer)
        navigation.navigate('homeScreen')
        recs.splice(0, songCount)
        setSongCount(1)
        setCurrentSongIndex(0) 
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContentContainer}>
                    <Pressable onPress={() => navgiateBack()}>
                        <Image source={require('../assets/backButton.png')} style={styles.backButtonImg}>
                        </Image>
                    </Pressable>
                    <Text style={styles.mdBodyBold}>Song Recommendations</Text>
                    <View style={styles.headerSpacer}></View>
                </View>
            </View>
            {/* <View> */}
            <View style={styles.overallCardContainer} >
                <CardsSwipe
                    cards={recs ? recs : []}
                    cardContainerStyle={styles.cardContainer}
                    ref= {swiper => { this.swiper = swiper }}
                    onSwipedRight= {(index) => 
                        onRight(index)}
                    onSwipedLeft= {(index) => 
                        onLeft(index)}
                    renderCard= {(card) => (
                        <LinearGradient colors={['#6700EA', '#121212']}  style={styles.card}>
                            <Image source={{uri: card.album.images[0].url}} style={styles.songImage}>
                            </Image>
                            <Text style={styles.mdTitleText}>{card.name}</Text>
                            <Text style={styles.lgRegBodyText}>{card.artists[0].name}</Text>

                        </LinearGradient>
                    )}
                />
             </View>
            <View style={styles.overallButtonContainer}>
                    <Pressable onPress={ () => {this.swiper.swipeLeft() }} style={styles.swipeNoButton}>
                            <Image source={require('../assets/noButton.png')} style={styles.icon24}>
                            </Image>
                    </Pressable>
                    <Pressable onPress={ () => {this.swiper.swipeRight() }} style={styles.swipeYesButton}>
                            <Image source={require('../assets/yesButton.png')} style={styles.icon24}>
                            </Image>
                    </Pressable>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: Themes.colors.background,
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      height: '100%', 
    },

    header: {
        width: '100%',
        padding: 16,
        paddingTop: 24,
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

    cardAndButtonContainer: {

    },

    overallCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        // height: '100%', 
        height: 633,
        paddingHorizontal: 24,
        paddingTop: 20, 
    },

    cardContainer: {
        width: '100%',
        height: '100%', 
        borderRadius: 12, 
        justifyContent: 'start',

    },

    card: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 24,
        paddingVertical: 28, 
        backgroundColor: Themes.colors.background,
        borderRadius: 12, 
        shadowColor: '#6700EA',
        shadowOffset: {
          width: 8,
          height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    overallButtonContainer: {
        width: '100%',
        height: 112,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 24, 
    },

    buttonContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 24,
        height: '100%',
        backgroundColor: 'yellow',
    },

    swipeNoButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginRight: 20,
        backgroundColor: '#E54545',
        width: '50%',
        borderRadius: 16,
    },

    swipeYesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Themes.colors.spotify,
        borderRadius: 16,
        width: '50%',
    },

    icon24: {
        width: 24,
        height: 24,
    },

    songImage: {
        width: '100%',
        aspectRatio: 1, 
        borderRadius: 6,
        marginBottom: 32,
    },

    mdTitleText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 36,
    },

    lgRegBodyText: {
        fontSize: 16,
        color: '#B3B3B3'
    },

    linearGradient: {
        backgroundImage: 'linear-gradient(to bottom, #6700EA, #000000)'
    }
})

export default SwipeScreen
