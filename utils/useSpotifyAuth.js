import getEnv from "./env";
import { Platform } from "react-native";
import { useState, useEffect } from "react";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import { getMyTopTracks, getAlbumTracks, getRecommendations } from "./apiOptions";

import * as WebBrowser from "expo-web-browser";

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
      setToken(access_token);
    }
    if (Platform.OS === "web" && location.hash)
      setToken(location.hash.split("=")[1]);
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      let res;
      let ress; 
      switch (ALBUM_ONLY) {
        case true:
          res = await getAlbumTracks(ALBUM_ID, token);
          break;
        default:
          res = await getMyTopTracks(token);
          ress = await getRecommendations(token)
          break;
      }
      setTracks(res)
      setRecommendations(ress)
      ;
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      let res;
      res = await getRecommendations(token)
      setRecommendations(res)
      ;
    };

    if (token) {
      // Authenticated, make API request
      fetchRecommendations();
    }
  }, [tracks]);


  const setLoggedIn = () => {
    promptAsync(
      Platform.OS === "web"
        ? { windowName: "_self" }
        : /* this is for forcing the popup to be created within the same window so needs same context */
          {}
    );
  };
  // TO DO: pick better naming conventions
  return { token: token ?? undefined, tracks, recommendations, getSpotifyAuth: setLoggedIn };
};

export default useSpotifyAuth;
