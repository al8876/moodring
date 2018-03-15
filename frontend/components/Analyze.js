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
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }

  _maybeRenderImage = () => {
    let { image } = this.props;

    if (!image) {
      return (
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={styles.image} />
          <Text style={styles.systemMessage}>ANALYZING MOOD</Text>
        </View>
      )
    } else {
      return (
        <View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', zIndex: 0 }}>
            <AnimatedCircularProgress
              ref='circularProgress'
              size={160}
              width={5}
              fill={100}
              tintColor="#00e0ff"
              backgroundColor="#3d5875" ee/>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.systemMessage}>ANALYZING MOOD</Text>
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
    this.refs.circularProgress.performLinearAnimation(100, 8000);
    setTimeout(() => {
      if (this.props.imageError === true) {
        this.props.setScreen('ERROR');
      } else {
        this.props.setScreen('PLAYLIST');
      }
      console.log('PROPS FROM ANALYZE COMPONENT --------------------')
      console.log(this.props)
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
    marginTop: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    zIndex: 10,
  }
});