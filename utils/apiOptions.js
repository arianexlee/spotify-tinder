import axios from 'axios';
import CachedTopTracks from './topTracksCache.json';
import CachedAlbumTracks from './albumTracksCache.json';
import getEnv from './env';

const {
  SPOTIFY_API: { SHORT_TERM_API, LONG_TERM_API, ALBUM_TRACK_API_GETTER, RECOMMENDATION_API},
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

export const getRecommendations = async (token) => {
  console.log('INITIAL_RECOMMENDATIONS')
  try {
    let res = await fetcher(RECOMMENDATION_API, token)
    // console.log('RECOMMENDATIONS', res.data.tracks)
    return res.data?.tracks
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
    return [];
  }
};



// const featcher_w_params = async (url, params, token) => {
//   try {
//     return await axios.get(url, {
//       headers: {

//       },
//       params: {

//       }
//     })
//   }
// }

// const fetcher_w_params = async (url, params, token) => {
//   try {
//     return await axios.get('https://api.spotify.com/v1/recommendations', {
//         params: {
//             'limit': '10',
//             'market': 'ES',
//             'seed_artists': '4NHQUGzhtTLFvgF5SZesLK',
//             'seed_genres': 'country',
//             'seed_tracks': '0c6xIDDpzE81m2q797ordA'
//         },
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer BQDwpWTEMTKz4tIkoCNFgyHCxN2MpTPv3i0rjdroU7blsU7yi-DDUkpm1AlzjXSJ8WQw63dzDIERLBrAkIEkab1g-al0jQG2tY6tAJqL1x4TMXgm90mBZIPEwLF1sh_2OZel6mpwGb3F9PbLR01zgciBA8uNHWLxrsXgUWvNWXg0JoribA'
//         }
//     });
//     console.log('RESPONSE');
//     // console.log(response);
//     // return response;
//     // return await axios.get(url, {seed_artists: [], seed_genres: ['country'], seed_tracks: []},
//     //   {
//     //   method: 'GET',
//     //   headers: {
//     //     Accept: 'application/json',
//     //     'Content-Type': 'application/json',
//     //     Authorization: 'Bearer ' + token,
//     //   },
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// };