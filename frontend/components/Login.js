
import Expo, { Constants, WebBrowser, LinearGradient, AuthSession } from 'expo';
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
import { Buffer } from 'buffer'
import TitleImage from '../assets/Moody_title.png';
import LoginSpotify from '../assets/login-spotify.png';
import OutRun from '../assets/outrun.gif';
import * as Animatable from 'react-native-animatable';

const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

const stateKey = 'spotify_auth_state';
const client_id = 'ec0f50a8fa1d4abc8a1740376f64ed97';
const client_secret = '097ec13156344d21949b606291eba5be';
// let redirect_uri = AuthSession.getRedirectUrl();
let redirect_uri = 'myapp://+';

export default class Login extends React.Component {
  state = {
    redirectData: null,
  };

  render() {

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animatable.Image animation="zoomInDown" duration={5000} style={ styles.title } source={TitleImage} />
        <ImageBackground style={{ flex: 1, height: 360, width: 360, position: 'absolute', bottom: 0 }} source={OutRun} ></ImageBackground>
        <Animatable.Image animation="fadeIn" iterationCount="infinite" direction='alternate' delay={3500} duration={1000} style={styles.tap} onPress={this._openWebBrowserAsync} source={LoginSpotify} />
        <TouchableOpacity onPress={this._handlePressAsync} style={{ backgroundColor: 'white', width: width, height: height, opacity: 0 }} />
      </View>
    );
  }

  componentDidMount() {
    if (this.state.redirectData) {
      this._returnHome()
    }
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  _generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  _handlePressAsync = async () => {
    let state = this._generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    let oShit = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    })

    let result = await AuthSession.startAsync({
      authUrl: 'https://accounts.spotify.com/authorize?' + oShit
    });
    await this._callback(result);
  };

  // POST REQUEST FOR THE ACCESS TOKEN
  _callback = async (res) => {
    console.log(res);
    const spotifyUrl = 'https://accounts.spotify.com/api/token'
    let authOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      },
      body: querystring.stringify({
        grant_type: "authorization_code",
        code: res.params.code,
        redirect_uri: redirect_uri,
      })
    };

    let response = await fetch(spotifyUrl, authOptions)
      .then((res) => querystring.stringify(res))
      .then((resToQuery) => querystring.parse(resToQuery))
      .then((queryToJSON) => JSON.parse(queryToJSON._bodyInit))
      .catch(e => console.log(e));

    // this should be a json object
    this.setState({ result: response })
    this.props.setToken(this.state.result.access_token);
    this._returnHome();
  }
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