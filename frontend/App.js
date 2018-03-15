import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';

import HomeScreen from './components/HomeScreen.js'
import Analyze from './components/Analyze.js'
import Playlist from './components/Playlist.js'
import Result from './components/Result.js'
import Error from './components/Error.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      screen: 'HOME',
      emotions: [],
      percentage: [],
      labels: [],
      labelsPercentage: [],
      topEmotion: null,
      face: true,
      age: null,
      backgroundColor: ['#5161B9', '#9C69CC'],
      imageError: false,
    };
  }
  
  // ------------------------------------------------------
  // Helper functions to be passed to props
  // ------------------------------------------------------
  setScreen(screen) {
    this.setState({screen: screen})
  };

  setUploading(bool) {
    this.setState({uploading: bool})
  };

  setImage(img) {
    this.setState({image: img})
  };

  setEmotion(emotion) {
    this.setState({topEmotion: emotion})
  }

  setEmotionList(array) {
    this.setState({emotions: array})
  }

  setEmotionPercentage(array) {
    this.setState({percentage: array})
  }

  setBackgroundColor(array) {
    this.setState({backgroundColor: array})
  }

<<<<<<< HEAD
  setImageError(bool) {
    this.setState({imageError: bool})
=======
  setLabels(array) {
    this.setState({labels: array})
  }

  setLabelsPercentage(array) {
    this.setState({labelsPercentage: array})
  }

  setFace(bool) {
    this.setState({face: bool})
  }

  setAge(num) {
    this.setState({age: num})
>>>>>>> master
  }

  // ------------------------------------------------------
  // render state
  // ------------------------------------------------------
  render() {
    let { image } = this.state;

    // ------------------------------------------------------
    // STEP 1: HOME SCREEN - Take picture using native camera
    // ------------------------------------------------------
    if (this.state.screen === 'HOME') {
      return (<HomeScreen {...this.state} setScreen={this.setScreen.bind(this)} setUploading={this.setUploading.bind(this)} setImage={this.setImage.bind(this)} setEmotion={this.setEmotion.bind(this)} setEmotionList={this.setEmotionList.bind(this)} setEmotionPercentage={this.setEmotionPercentage.bind(this)} setBackgroundColor={this.setBackgroundColor.bind(this)} setLabels={this.setLabels.bind(this)} setLabelsPercentage={this.setLabelsPercentage.bind(this)} setFace={this.setFace.bind(this)} setAge={this.setAge.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 2: ANALYZE SCREEN - Take picture using native camera
    // ------------------------------------------------------
    } else if (this.state.screen === 'ANALYZE') {
      return (<Analyze {...this.state} setScreen={this.setScreen.bind(this)} setImageError={this.setImageError.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 3: SPOTIFY SCREEN - After picture was taken
    // ------------------------------------------------------
    } else if (this.state.screen === 'PLAYLIST') {
      return (<Playlist {...this.state} setScreen={this.setScreen.bind(this)} />)
    
    // ------------------------------------------------------
    // STEP 4: MOOD RESULTS SCREEN - Shows mood statistics
    // ------------------------------------------------------
    } else if (this.state.screen === 'RESULTS') {
      return (<Result {...this.state} setScreen={this.setScreen.bind(this)}/>)
    
    // ------------------------------------------------------
    // STEP 5: ERROR SCREEN - If picture renders undefined
    // ------------------------------------------------------    
    } else if (this.state.screen === 'ERROR') {
      return (<Error {...this.state} setScreen={this.setScreen.bind(this)}/>)
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