import { Platform } from "react-native";

// ***** TODO: Fill in your constants here ***** //
// const CLIENT_ID = "f5aa32aa1e834546aeeff2ff5edd056c";
const CLIENT_ID = "6328d0649071430ca70640700b180633";
const REDIRECT_URI = "exp://192.168.1.210:19000"; // TODO: Replace this with your own redirect URI
const ALBUM_ID = "2nLOHgzXzwFEpl62zAgCEC?si=92gvi84ZTLKfMD-YgYWAUw"; // By default, this is the Weeknd's Album's "DAWN FM"
// ********************************************* //

const redirectUri = (uri) => {
  if (!uri) {
    const err = new Error(
      "No redirect URI provided.\nPlease provide a redirect URI in env.js.\n You can find the file in utils/env.js."
    );
    console.error(err);
    alert(err);
  }
  return Platform.OS === "web" ? "http://localhost:19006/" : uri;
};

const ENV = {
  CLIENT_ID: CLIENT_ID,
  SCOPES: [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
  ],
  REDIRECT_URI: redirectUri(REDIRECT_URI),
  ALBUM_ID: ALBUM_ID,
  SPOTIFY_API: {
    // Endpoints for auth & token flow
    DISCOVERY: {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    },
    SHORT_TERM_API:
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
    LONG_TERM_API:
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
    ALBUM_TRACK_API_GETTER: (albumId) =>
      `https://api.spotify.com/v1/albums/${albumId}/tracks`
  },
};

const getEnv = () => ENV;
export default getEnv;
// ^ use this type of exporting to ensure compliance with webpack and expo-web
