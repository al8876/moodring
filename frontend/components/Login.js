
import Expo, { Constants, WebBrowser, LinearGradient } from 'expo';
import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import qs from 'qs';
import querystring from 'querystring';
import TitleImage from '../assets/Moody_title.png';
import LoginSpotify from '../assets/login-spotify.png';
import OutRun from '../assets/outrun.gif';
import * as Animatable from 'react-native-animatable';

const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

export default class Login extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    console.log(this.state);


    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animatable.Image animation="zoomInDown" duration={5000} style={ styles.title } source={TitleImage} />
        <ImageBackground style={{ flex: 1, height: 360, width: 360, position: 'absolute', bottom: 0 }} source={OutRun} ></ImageBackground>
        <Animatable.Image animation="fadeIn" iterationCount="infinite" direction='alternate' delay={3500} duration={1000} style={styles.tap} onPress={this._openWebBrowserAsync} source={LoginSpotify} />
        <TouchableOpacity onPress={this._openWebBrowserAsync} style={{ backgroundColor: 'white', width: width, height: height, opacity: 0 }} />
      </View>
    );
  }

  componentDidMount() {
    if (this.state.redirectData) {
      this._returnHome()
    }
  }

  // STEP 2 - LINK TO SPOTIFY AUTH
  // ------------------------------------------------------------

  _generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


  //  STEP 3 - spotify should redirect to this url
  //  Setup spotify whitelist URL in spotify dev
  _getSpotifyAuthURL = () => {
    const client_id = '817050870e3542749870ff522e26192d';
    const client_secret = '195579d0f69a477e870fb8974fec7cd9';
    const redirect_uri = `https://redirect-server.now.sh/callback`;

    var state = this._generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    var oShit = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    })

    // console.log('https://accounts.spotify.com/authorize?' + oShit);
    console.log(Constants.linkingUri);
    console.log(this.state.redirectData);
    return 'https://accounts.spotify.com/authorize?' + oShit;
  }

  // ------------------------------------------------------------

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    let query = event.url.replace(Constants.linkingUri, '');
    let data;
    if (query) {
      data = qs.parse(query);
      this._returnHome();
    } else {
      data = null;
    }
    console.log('---- THIS IS DATA ----')
    console.log(data)

    // SETS PROPS TOKEN
    this.props.setToken(data.access_token)
  };

  _openWebBrowserAsync = async () => {
    const spotifyUrl = this._getSpotifyAuthURL();

    this._addLinkingListener();
    let result = await WebBrowser.openBrowserAsync(
      spotifyUrl
    );

    console.log(spotifyUrl);
    console.log('fuck your mother', typeof spotifyUrl);

    this._removeLinkingListener();
  };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A00FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
    color: 'white',
  },
  tap: {
    flex: 1,
    marginTop: 50,
    position: 'absolute',
    top: 270,
  },
  title: {
    flex: 1,
    top: 150,
    position: 'absolute',
  },
});