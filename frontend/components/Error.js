import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
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
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';
import * as Animatable from 'react-native-animatable';
import ErrorImage from '../assets/error.png';

import ErrorButton from '../assets/errorButton.png';

import errorMessage from '../assets/errorMessage.png';


export default class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("CHANGING TO HOME");
      this.props.setScreen('HOME');
    });
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <Animatable.View animation="fadeIn" easing="ease-out" iterationCount={1} style={styles.container}>
          
          <Image style={{ width: 250, height: 100 }} source={ErrorImage}/>
          <Image style={ styles.errorMessage } source={errorMessage}/>
          
          <TouchableOpacity onPress={this._returnHome} style={{paddingTop: 50}}>
            <Image style={styles.timeOutButton} source={ErrorButton}/>            
          </TouchableOpacity>

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
    backgroundColor: '#9C69CC',
  },
  timeOutButton: {
    height: 52,
    width: 260,
  },
  errorMessage: {
    marginTop: 40,
    width: 250,
    height: 150,
  }
});