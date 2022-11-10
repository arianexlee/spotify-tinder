import React from "react";
import { StyleSheet, Image, SafeAreaView, Text, Pressable, FlatList, View } from "react-native";
import { useSpotifyAuth } from "../utils";
import { Themes } from "../assets/Themes";
import SongItem from "../components/songItem";


export default function HomeScreen({navigation}) {
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();

  const AuthButton = (props) => {
    return (
      <Pressable onPress={props.authFunction} style={styles.connect}>
        <Image source={require('../assets/spotify-logo.png')} style={styles.connectLogo}>
        </Image>
        <Text style={styles.connectText}>Connect with Spotify</Text>
      </Pressable>
    )
  }
  
  const List = ({tracks}) => {
    return (
      <FlatList
        data={tracks}
        renderItem={({item}) => <SongItem item = {item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
  
  const Header = (props) => {
    return (
      <View style={styles.Header}>
        <Image source={require('../assets/spotify-logo.png')} style={styles.connectLogo}>
        </Image>
        <Text style={styles.connectText}>My Top Tracks</Text>
      </View>
    );
  }

  let contentDisplayed;
  if (token) {
    contentDisplayed =
    <List tracks={tracks}/>
  } else {
    contentDisplayed = 
    <AuthButton authFunction={getSpotifyAuth}/>
  }

  let header;
  if (token) {
    header = <Header/>
  }

  return (
     <SafeAreaView style={styles.container}>
        {header}
        {contentDisplayed}
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 0,
    margin: 0,
  },

  connect: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Themes.colors.spotify,
    borderRadius: 99999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  connectText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 8,
    fontWeight: 'bold',
  },

  connectLogo: {
    width: 20,
    height: 20,
  },

  Header: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
