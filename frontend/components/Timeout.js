import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  ImageBackground,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  Dimensions
} from 'react-native';
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';
import TimeOut from '../assets/timeout.png'
import TimeOutGif from '../assets/timeout.gif'
import TimeOutMessage from '../assets/timeout-message.png'
import TimeOutButton from '../assets/timeoutbutton.png'
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default class Timeout extends React.Component {
  constructor(props) {
    super(props);
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  render() {
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <Animatable.View animation="fadeIn" easing="ease-out" iterationCount={1}>
          
          <ImageBackground style={{ alignItems: 'center', justifyContent: 'center', width, height }} source={TimeOutGif}>
          <Image style={{ width: 280, height: 130 }} source={TimeOut}/>
          <Image style={ styles.timeOutMessage } source={TimeOutMessage}/>
          
          <TouchableOpacity onPress={this._returnHome} style={{paddingTop: 50}}>
            <Image style={styles.timeOutButton} source={TimeOutButton}/>
          </TouchableOpacity>

          </ImageBackground>
        </Animatable.View>
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
  timeOutButton: {
    height: 52,
    width: 260,
  },
  timeOutMessage: {
    marginTop: 40,
  }
});