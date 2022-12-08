import axios from 'axios';
import CachedTopTracks from './topTracksCache.json';
import CachedAlbumTracks from './albumTracksCache.json';
import getEnv from './env';

const {
  SPOTIFY_API: { SHORT_TERM_API, LONG_TERM_API, ALBUM_TRACK_API_GETTER},
} = getEnv();

const NETWORK_FAILURE = new Error(
  'Network failure.\nCheck console for more details.\nRandom cached data is returned.'
);

const fetcher = async (url, token) => {
  try {
    return await axios(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const fetcher_w_post = async (url, token) => {
  try {
    return await axios(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyTopTracks = async (token) => {
  const cache = { data: { items: CachedTopTracks } };
  try {
    let res = await fetcher(SHORT_TERM_API, token);
    if (!res || !res.data?.items.length) res = await fetcher(LONG_TERM_API, token);
    if (!res || !res.data?.items.length) res = cache;
    return res.data?.items;
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return cache;
  }
};

export const getAlbumTracks = async (albumId, token) => {
  try {
    const res = await fetcher(ALBUM_TRACK_API_GETTER(albumId), token);
    const transformedResponse = res.data?.tracks?.items?.map((item) => {
      item.album = { images: res.data?.images, name: res.data?.name };
      return item;
    });
    if (!transformedResponse) return CachedAlbumTracks;
    return transformedResponse;
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return CachedAlbumTracks;
  }
};

export const getRecommendations = async (token, seedData) => {
  const stringSeedData = seedData.toString()
  // console.log('String', stringSeedData)
  const encodedSeedString = encodeURIComponent(stringSeedData)
  const RECOMMENDATION_API = "https://api.spotify.com/v1/recommendations?limit=50&seed_tracks=" + encodedSeedString
  try {
    let res = await fetcher(RECOMMENDATION_API, token)
    return res.data?.tracks // these should be recs based on seedData
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return [];
  }
};


export const getCurrentUserPlaylists = async (token) => {
  const GET_CURRENT_USER_PLAYLISTS_API = "https://api.spotify.com/v1/me/playlists?limit=50"
  try {
    let res = await fetcher(GET_CURRENT_USER_PLAYLISTS_API, token)
    return res.data?.items;
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return [];
  }
};

export const getCurrentUserProfile = async (token) => {
  const GET_CURRENT_USER = "https://api.spotify.com/v1/me"
  try {
    let res = await fetcher(GET_CURRENT_USER, token)
    return res.data
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return [];
  }
};

export const getTrackFeatures = async (token, trackIds) => {
  const stringtrackIds = trackIds.toString()
  const encodedtrackIds = encodeURIComponent(stringtrackIds)
  const GET_TRACKS_API = "https://api.spotify.com/v1/tracks?ids=" + encodedtrackIds
  console.log("API:", GET_TRACKS_API)
  try {
    let res = await fetcher(GET_TRACKS_API, token)
    return res.data?.tracks // these should be recs based on seedData
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return [];
  }
};

// export const addTrack = (playlistID, trackURI) => {
//   axios.post('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
//     uris: [trackURI]
//   }, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//     }
//   })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// };
