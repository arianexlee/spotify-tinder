import React from "react";
import { useContext} from "react";
import { StyleSheet, Image, SafeAreaView, Text, Pressable, FlatList, View } from "react-native";
import { useSpotifyAuth } from "../utils";
import { Themes } from "../assets/Themes";
import SavedRecItem from "../components/SavedRecItem";
// import { useNavigation } from "@react-navigation/native";
import { recsContext, savedRecsContext, userPlaylistsContext } from "../App";


export default function HomeScreen({navigation}) {
  const {recs, setRecs} = useContext(recsContext)
  const {savedRecs, setSavedRecs} = useContext(savedRecsContext)
  const {userPlaylists, setUserPlaylists} = useContext(userPlaylistsContext)
  const { token, tracks, recommendations, playlists, user, getSpotifyAuth } = useSpotifyAuth();
  setRecs(recommendations)
  setUserPlaylists(playlists)

  const name = user.display_name
  const first_name = name != undefined ? name.split(' ')[0] : ""

  const AuthButton = (props) => {
    return (
      <Pressable onPress={props.authFunction} style={styles.connect}>
        <Image source={require('../assets/spotify-logo.png')} style={styles.connectLogo}>
        </Image>
        <Text style={styles.smTitleText}>Connect with Spotify</Text>
      </Pressable>
    );
  }
  
  const Header = (props) => {
    return (
      <View style={styles.Header}>
        <Text style={styles.welcomeText}>Welcome, Name</Text>
      </View>
    );
  }


  const SavedRecList = ({savedRecs}) => {
    return (
      <FlatList
        data={savedRecs}
        renderItem={({item}) => <SavedRecItem item = {item} token={token}/>}
        keyExtractor={(item) => item.id}
      />
    );
  }


  let contentDisplayed;
  if (token) {
    contentDisplayed =
    <View style={styles.bodyContainer}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.mdTitleText}>Welcome,</Text>
        <Text style={styles.mdTitleText}>{first_name}</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('swipeScreen')}>
        <View style={styles.discoverSongsButton}>
          <Text style={styles.discoverSongsText}>DISCOVER SONGS</Text>
        </View>
      </Pressable>
      <View style={styles.recommendationsContainer}>
        <View style={styles.savedRecommendationsTitleContainer}>
          <Text style={styles.smTitleText}>Saved Recommendations:</Text>
        </View>
        <View style={styles.recommendationEditAndSongsContainer}>
          <SavedRecList savedRecs={savedRecs}/>
        </View>
      </View>
    </View>
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
        {contentDisplayed}
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },

  bodyContainer: {
    width: '100%', 
    padding: 24, 
    height: '100%',
  },

  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'column', 
  },

  mdTitleText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },

  smTitleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  discoverSongsButton: {
    width: '100%',
    height: 48,
    backgroundColor: Themes.colors.spotify,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginVertical: 24, 
  },

  discoverSongsText: {
    fontSize: 15, 
    color: 'black', 
    fontWeight: 'bold',
  },

  recommendationsContainer: {
    width: '100%',
  },

  savedRecommendationsTitleContainer: {
    width: '100%', 
    marginBottom: 12, 
  },

  recommendationEditAndSongsContainer: {
    width: '100%',
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

  connectLogo: {
    width: 20,
    height: 20,
    marginRight: 8, 
  },

  Header: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
