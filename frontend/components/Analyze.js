import React from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Exponent, { Constants, registerRootComponent } from 'expo';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import Background from '../assets/analyzeBackground.gif';
import AnalyzingText from '../assets/analyzingText.png';

const { width, height } = Dimensions.get('window');

export default class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { image } = this.props;
    if (!image) {
      this.setScreen('ERROR');
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Image source={Background} style={{ position: 'absolute', height: height, width: width }}/>

          <View style={{marginTop: 75}}>
            <View style={styles.progressCircle}>
                <Progress.CircleSnail color={['#EC8D27']} size={170} thickness={5} />
            </View>
            
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <Animatable.Image animation="fadeIn" easing="ease-in-out" iterationCount="infinite" direction='alternate' duration={2000} style={styles.systemMessage} source={AnalyzingText} />            
            </View>
          </View>

        </View>
      );
    }
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // -----------------------------------------------------

  componentDidMount() {

    // CHANGE SCREEN STATE LOGIC
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
    }, 8500);
  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  progressCircle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 100,
  },
  systemMessage: {
    width: 170,
    height: 20,
    marginTop: 30,
  },
  imageContainer: {
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