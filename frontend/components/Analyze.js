import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';
import * as Progress from 'react-native-progress';


export default class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }

  _maybeRenderImage = () => {
    let { image } = this.props;
    if (!image) {
      this.setScreen('ERROR');
    } else {
      return (
        <View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', zIndex: 100 }}>
              <Progress.CircleSnail color={['#1FBAEB']} size={170} thickness={5} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.systemMessage}>ANALYZING PICTURE</Text>
          </View>
        </View>
      );
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <TouchableOpacity>
          {this._maybeRenderImage()}
        </TouchableOpacity>
      </View>
    );
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // -----------------------------------------------------

  componentDidMount() {
    setTimeout(() => {
      if (this.props.error) {
        this.props.setScreen('ERROR')
        console.log('IMAGE ERROR - SHOW ERROR PAGE')
      } else if (!this.props.playlist) {
        this.props.setScreen('TIMEOUT')
        console.log('REQUEST TIMED OUT')
      } else {
        this.props.setScreen('PLAYLIST');
        console.log('ANALYZE PASS - RENDERING PLAYLIST PAGE')
      }
    }, 8000);
  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemMessage: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    zIndex: 10,
  }
});