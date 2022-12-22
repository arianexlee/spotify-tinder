import getEnv from "./env";
import { Platform } from "react-native";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import { getMyTopTracks, getAlbumTracks, getRecommendations, getTrackImages, getCurrentUserPlaylists, getCurrentUserProfile } from "./apiOptions";
import * as WebBrowser from "expo-web-browser";
import { useState, useEffect, createContext, useContext} from "react";


const {
  REDIRECT_URI,
  SCOPES,
  CLIENT_ID,
  ALBUM_ID,
  SPOTIFY_API: { DISCOVERY },
} = getEnv();

// needed so that the browswer closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

const useSpotifyAuth = (ALBUM_ONLY = false) => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [user, setUser] = useState([]);
  const [_, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri:
        Platform.OS !== "web"
          ? REDIRECT_URI
          : makeRedirectUri({
              // scheme: null, // optional for web, mobile default: 'exp'
              preferLocalhost: true,
              isTripleSlashed: true,
              // useProxy: true, // not needed afaict, default: false
            }),
    },
    DISCOVERY
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("Access Token:", access_token)
      setToken(access_token);
    }
    if (Platform.OS === "web" && location.hash)
      setToken(location.hash.split("=")[1]);
  }, [response]);


  useEffect(() => {
    const fetchTracks = async () => {
      let res;
      let recommendations; 
      let playlists;
      let user;
      switch (ALBUM_ONLY) {
        case true:
          res = await getAlbumTracks(ALBUM_ID, token);
          break;
        default:
          res = await getMyTopTracks(token);
          setTracks(res)
          console.log("Tracks", tracks)
          const top5Songs = res.slice(0, 5);
          // console.log("Top 5:", top5Songs)
          const seedData = []
          top5Songs.forEach(item => 
            seedData.push(item.id))
          // console.log("Seed Data: ", seedData)
          recommendations = await getRecommendations(token, seedData)
          const trackIDs = []
          recommendations.forEach(item => 
            trackIDs.push(item.id))
          setRecommendations(recommendations)
          playlists = await getCurrentUserPlaylists(token)
          setPlaylists(playlists)
          user = await getCurrentUserProfile(token)
          setUser(user)
          break;
      }
      ;
    };
    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);




  // useEffect(() => {
  //   const fetchTrackImages = async () => {
  //     let res;
  //     res = await getTrackImages(token, trackIds);
  //     setTracks(res)
  //     const top5Songs = res.slice(0, 5);
  //     const seedData = []
  //     top5Songs.forEach(item => 
  //       seedData.push(item.id))
  //     recommendations = await getRecommendations(token, seedData)
  //     //now get track info + features
  //     setRecommendations(recommendations)
  //   };
  //   if (token) {
  //     // Authenticated, make API request
  //     fetchTracks();
  //   }
  // }, [token]);



  // useEffect(() => {
  //   const fetchRecommendations = async () => {
  //     let res;
  //     res = await getRecommendations(token)
  //     setRecommendations(res)
  //     ;
  //   };

  //   if (token) {
  //     // Authenticated, make API request
  //     fetchRecommendations();
  //   }
  // }, [tracks]);

  const setLoggedIn = () => {
    promptAsync(
      Platform.OS === "web"
        ? { windowName: "_self" }
        : /* this is for forcing the popup to be created within the same window so needs same context */
          {}
    );
  };
  // TO DO: pick better naming conventions
  return { token: token ?? undefined, tracks, recommendations, playlists, user, getSpotifyAuth: setLoggedIn };
};

export default useSpotifyAuth;
