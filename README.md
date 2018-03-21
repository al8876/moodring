# Moody

An artificial intelligence application that scans photos for human emotion and environment to create spotify playlists best suited for the photo.

Utilizing AWS rekognition and Spotify API

Snap a photo or grab it from your camera roll, upload it. See `/backend`
for an example node service to handle the upload to s3, and `/frontend`
for the Expo app.

# Setting Up the Redirect Server

### For running on your own
1. Register your app with developers.spotify
2. paste the `client_id` and `client_secret` accordingly into index.js
1. Make sure expo xde host is set to LAN and protocol is set to exp
1. in index.html - Change the baseUri to the uri in expo XDE (i.e exp://192.168.1.160:19000)
2. in index.js - at line 82 change res.redirect uri to have correct linkingURI in the query to match the baseUri in index.html i.e res.redirect(`https://redirect-server.now.sh/?linkingUri=<YOUR LOCAL EXPO URI IN XDE>/+` )
4. In developers.spotify: Update URI whitelist to include the FULL line above.
5. Remove any existing now.sh servers containing the alias of redirect-server. Use `now ls` to get the current list and status of servers running and `now rm <CURRENT REDIRECT SERVER>` to remove the current redirect-server
6. deploy server using `now` in the `moodring/redirect-server` directory
7. Create the static uri for the deployed server using `now alias <DEPLOYED SERVER>`


