import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

import LoginScreen from './components/Login.js'
import HomeScreen from './components/HomeScreen.js'
import Analyze from './components/Analyze.js'
import Playlist from './components/Playlist.js'
import Result from './components/Result.js'
import Error from './components/Error.js'
import Timeout from './components/Timeout.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      image: null,
      uploading: false,
      screen: 'LOGIN',
      emotions: [],
      percentage: [],
      labels: [],
      labelsPercentage: [],
      face: true,
      age: null,
      backgroundColor: ['#5161B9', '#9C69CC'],
      error: false,
      playlist: null,
      previousPage: null,
      tutorialModalShown: true,
    };
  }

  // ------------------------------------------------------
  // Helper functions to be passed to props
  // ------------------------------------------------------
  setScreen(screen) {
    this.setState({screen: screen});
  };

  setUploading(bool) {
    this.setState({uploading: bool});
  };

  setImage(img) {
    this.setState({image: img});
  };

  setEmotionList(array) {
    this.setState({emotions: array});
  }

  setEmotionPercentage(array) {
    this.setState({percentage: array});
  }

  setBackgroundColor(array) {
    this.setState({backgroundColor: array});
  }

  setLabels(array) {
    this.setState({labels: array});
  }

  setLabelsPercentage(array) {
    this.setState({labelsPercentage: array});
  }

  setFace(bool) {
    this.setState({face: bool});
  }

  setAge(num) {
    this.setState({age: num});
  }

  setError(bool) {
    this.setState({error: bool});
  }

  setPlaylist(url) {
    this.setState({playlist: url});
  }

  setToken(string) {
    this.setState({token: string});
  }

  setPreviousPage(string) {
    this.setState({previousPage: string})
  }

  setTutorialScreen(bool) {
    this.setState({tutorialModalShown: bool})
  }

  // ------------------------------------------------------
  // render state
  // ------------------------------------------------------
  render() {
    let { image } = this.state;

    // ------------------------------------------------------
    // STEP 0: LOGIN SCREEN - CURRENTLY SANDBOXING
    // ------------------------------------------------------

    if (this.state.screen === 'LOGIN') {
      return (<LoginScreen {...this.state} setToken={this.setToken.bind(this)} setScreen={this.setScreen.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 1: HOME SCREEN - Take picture using native camera
    // ------------------------------------------------------
    } else if (this.state.screen === 'HOME') {
        return (<HomeScreen {...this.state} setScreen={this.setScreen.bind(this)} setUploading={this.setUploading.bind(this)} setImage={this.setImage.bind(this)} setEmotionList={this.setEmotionList.bind(this)} setEmotionPercentage={this.setEmotionPercentage.bind(this)} setBackgroundColor={this.setBackgroundColor.bind(this)} setLabels={this.setLabels.bind(this)} setLabelsPercentage={this.setLabelsPercentage.bind(this)} setFace={this.setFace.bind(this)} setAge={this.setAge.bind(this)} setError={this.setError.bind(this)} setPlaylist={this.setPlaylist.bind(this)} setTutorialScreen={this.setTutorialScreen.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 2: ANALYZE SCREEN - Take picture using native camera
    // ------------------------------------------------------
    } else if (this.state.screen === 'ANALYZE') {
      return (<Analyze {...this.state} setScreen={this.setScreen.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 3: SPOTIFY SCREEN - After picture was taken
    // ------------------------------------------------------
    } else if (this.state.screen === 'PLAYLIST') {
      return (<Playlist {...this.state} setScreen={this.setScreen.bind(this)} setPreviousPage={this.setPreviousPage.bind(this)} />)

    // ------------------------------------------------------
    // STEP 4: RESULTS SCREEN - Displays results of the analysis
    // ------------------------------------------------------
    } else if (this.state.screen === 'RESULTS') {
      return (<Result {...this.state} setScreen={this.setScreen.bind(this)} setPreviousPage={this.setPreviousPage.bind(this)} />)

    // ------------------------------------------------------
    // STEP 5: ERROR SCREEN - If image error occurs
    // ------------------------------------------------------
    } else if (this.state.screen === 'ERROR') {
      return (<Error {...this.state} setScreen={this.setScreen.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 6: TIMEOUT SCREEN - If spotify does not return playlist within 8 seconds
    // ------------------------------------------------------
    } else if (this.state.screen === 'TIMEOUT') {
      return (<Timeout {...this.state} setScreen={this.setScreen.bind(this)}/>)
    }

  }
}

// ------------------------------------------------------
// Styles should go in here - TODO: refactor as a component (maybe) do dry up code in components
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});