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
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';
import TimeOut from '../assets/timeout.png'
import * as Animatable from 'react-native-animatable';



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
        <Animatable.View animation="fadeIn" easing="ease-out" iterationCount={1} style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <Image style={{ width: 280, height: 130 }} source={TimeOut}/>
          <Text style={{color: 'white', fontSize: 15, textAlign: 'center' }}>Uh Oh! Looks like your connection timed out! {"\n"}{"\n"} Try clearing your phones cache or restarting your phone!</Text>        
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