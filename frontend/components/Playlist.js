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
import { PieChart } from 'react-native-svg-charts';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  _showResults = () => {
    this.props.setScreen('RESULTS')
  };

  render() {
    console.log('PROPS FROM PLAYLIST RESULTS ---------------------------')
    console.log(this.props)
    return (
      <View style={styles.container}>
        
        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />

        <Text style={{ marginTop: 30, color: 'white', fontSize: 20, padding: 10 }}>YOUR CUSTOM PLAYLIST</Text>

        <WebView source={{ uri: this.props.playlist }} style={{ marginTop: 20, marginBottom: 30, height: 380, width: 300 }} />

        <TouchableOpacity onPress={this._showResults} style={{ paddingBottom: 20 }}>
          <Text style={styles.moodResultButton}>MOOD RESULTS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._returnHome}>
          <Text style={styles.startOverButton}>START OVER</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodResultButton: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
  },
  startOverButton: {
    color: 'white',
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  }
});