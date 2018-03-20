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
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';
import { PieChart } from 'react-native-svg-charts';

// IMPORT BACKGROUND IMAGE
import Background from '../assets/playlist.gif';

// IMPORT START OVER TEXT IMAGE
import StartOver from '../assets/startOverText.png'

import Result from './Result.js'

const { width, height } = Dimensions.get('window');

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('--PLAYLIST SCREEN BACK BUTTON HIT--')
      console.log(this.props)
      if (this.props.previousPage === 'RESULTS') {
        console.log('-- PREVIOUS PAGE WAS RESULTS ----')
        this.props.setPreviousPage('PLAYLIST')
        return false;
      } else {
        this.props.setScreen('HOME')
      }
    });
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  _showResults = () => {
    this.props.setScreen('RESULTS');
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    // console.log('-------- THIS IS THE PROPS FROM PLAYLIST -------- ')
    // console.log(this.props)

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        {/* <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: height, width: width }} /> */}
        <Image source={Background} style={{ position: 'absolute', height: height, width: width }}/>



        <WebView source={{ uri: this.props.playlist }} style={{ marginTop: 35, marginBottom: 35, height: height, width: (width - 70) }} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{height: height, width: width,}}>
                <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: height, width: width }} />  
                <Result {...this.props}/>
                <Text style={styles.tapToClose}>TAP TO CLOSE</Text>
              </TouchableOpacity>

          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }} style={{ paddingBottom: 20 }}>
          <Text style={styles.moodResultButton}>VIEW RESULTS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._returnHome}>
          <Image source={StartOver} style={styles.startOver} />
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
  startOver: {
    paddingHorizontal: 20,
    marginBottom: 30,
    height: 40,
    width: 200,
  },
  tapToClose: {
    fontSize: 25,
    marginBottom: 50,
    color: 'white',
    textAlign: 'center',
  }
});