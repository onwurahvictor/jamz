// const clientId = '9273598383b14b95adb66dc80c0ab094';
// const redirectUri = 'http://192.168.0.217:3002'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
// let accessToken;

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }

//     const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
//     if (accessTokenMatch && expiresInMatch) {
//       accessToken = accessTokenMatch[1];
//       const expiresIn = Number(expiresInMatch[1]);
//       window.setTimeout(() => accessToken = '', expiresIn * 1000);
//       window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
//       return accessToken;
//     } else {
//       const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
//       window.location = accessUrl;
//     }
//   },

//   search(term) {
//     const accessToken = Spotify.getAccessToken();
//     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     }).then(response => {
//       return response.json();
//     }).then(jsonResponse => {
//       if (!jsonResponse.tracks) {
//         return [];
//       }
//       return jsonResponse.tracks.items.map(track => ({
//         id: track.id,
//         name: track.name,
//         artist: track.artists[0].name,
//         album: track.album.name,
//         uri: track.uri
//       }));
//     });
//   },

//   savePlaylist(name, trackUris) {
//     if (!name || !trackUris.length) {
//       return;
//     }

//     const accessToken = Spotify.getAccessToken();
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     let userId;

//     return fetch('https://api.spotify.com/v1/me', {headers: headers}
//     ).then(response => response.json()
//     ).then(jsonResponse => {
//       userId = jsonResponse.id;
//       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         headers: headers,
//         method: 'POST',
//         body: JSON.stringify({name: name})
//       }).then(response => response.json()
//       ).then(jsonResponse => {
//         const playlistId = jsonResponse.id;
//         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
//           headers: headers,
//           method: 'POST',
//           body: JSON.stringify({uris: trackUris})
//         });
//       });
//     });
//   }
// };

// export default Spotify;

const clientId = '9273598383b14b95adb66dc80c0ab094';
const redirectUri = 'http://192.168.0.217:3000'; // Must match Spotify app settings

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];

        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      })
      .catch(error => {
        console.error("Search failed:", error);
        return [];
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return Promise.resolve(); // Prevents error if inputs are invalid
    }

    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name })
        });
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ uris: trackUris })
        });
      })
      .catch(error => {
        console.error("Error saving playlist:", error);
      });
  }
};

export default Spotify;


