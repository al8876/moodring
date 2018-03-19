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
  TouchableHighlight
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';
import { PieChart } from 'react-native-svg-charts';
// import ResultModal from 'ResultsModal'


export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  };

  // componentDidMount(){
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     console.log('--PLAYLIST SCREEN BACK BUTTON HIT--')
  //     console.log(this.props)
  //     if (this.props.previousPage === 'RESULTS') {
  //       console.log('-- PREVIOUS PAGE WAS RESULTS ----')
  //       this.props.setPreviousPage('PLAYLIST')
  //       return false;
  //     } else {
  //       this.props.setScreen('HOME')
  //     }
  //   });
  // }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  _showResults = () => {
    this.props.setScreen('RESULTS')
  };

  setModalVisible(bool) {
    this.setState({modalVisible: bool})
  }

  render() {
    console.log('-------- THIS IS THE PROPS FROM PLAYLIST -------- ')
    console.log(this.props)
    console.log('-------- THIS IS THE STATE FROM PLAYLIST -------- ')
    console.log(this.state)

    return (
      <View style={styles.container}>

        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />

        <WebView source={{ uri: this.props.playlist }} style={{ marginTop: 50, marginBottom: 30, height: 380, width: 300 }} />

        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}

        <TouchableOpacity onPress={this.setModalVisible(true)} style={{ paddingBottom: 20 }}>
          <Text style={styles.moodResultButton}>SHOW MODAL MOOD RESULTS</Text>
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