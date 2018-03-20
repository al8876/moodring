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
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Animatable.View animation="fadeIn" easing="ease-out" iterationCount={1} style={styles.container}>
          <Image style={{ width: 250, height: 100 }} source={ErrorImage}/>
          <Text style={{color: 'white', fontSize: 15 }}>Uh Oh! Looks like this picture doesn't work!</Text>
          <TouchableOpacity onPress={this._returnHome} style={{paddingTop: 50}}>
            <Text style={{color: 'white', fontSize: 20, borderWidth: 2, borderColor: 'white', paddingHorizontal: 20, paddingVertical: 10 }}>TAP HERE TO GO BACK</Text>
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
  },
});