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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      screen: 'HOME',
    };
  }
  
  // ------------------------------------------------------
  // Pass this to props to change the state and advance step
  // ------------------------------------------------------
  setScreen(screen) {
    this.setState({screen: screen})
  };

  setUploading(bool) {
    this.setState({uploading: bool})
  };

  setImage(img) {
    this.setState({image: img})
  };

  // ---------------------
  // render state: should only have components - TODO: Dry up code and take out logic
  // ---------------------
  render() {
    let { image } = this.state;
    
    // ------------------------------------------------------
    // STEP 1: HOME SCREEN - Take picture using native camera
    // ------------------------------------------------------
    if (this.state.screen === 'HOME') {
      // return (<HomeScreen setScreen={this.setScreen.bind(this)} nextScreen={this.state.screen}/>)
      return (<HomeScreen {...this.state} setScreen={this.setScreen.bind(this)} setUploading={this.setUploading.bind(this)} setImage={this.setImage.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 2: ANALYZE SCREEN - Take picture using native camera
    // ------------------------------------------------------
    } else if (this.state.screen === 'ANALYZE') {
      return (<Analyze {...this.state} setScreen={this.setScreen.bind(this)}/>)

    // ------------------------------------------------------
    // STEP 3: SPOTIFY SCREEN - After picture was taken
    // ------------------------------------------------------
    } else if (this.state.screen === 'PLAYLIST') {
      return (<Playlist {...this.state} setScreen={this.setScreen.bind(this)}/>)
    }
  }
}


// ------------------------------------------------------
// HomeScreen Component: STEP 1
// ------------------------------------------------------
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen};
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this.props.setScreen('ANALYZE');
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    try {
      this.props.setUploading(true);
      if (!pickerResult.cancelled) {
        console.log(1);
        uploadResponse = await this.uploadImageAsync(pickerResult.uri);
        console.log(uploadResponse);
        uploadResult = await uploadResponse.json();
        this.props.setImage(uploadResult.location);
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      // this.setState({ uploading: false });
      this.props.setUploading(false); 
    }
  };

  async uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
  
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options);
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // ------------------------------------------------------

  render() {
    return( 
    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <TouchableOpacity onPress={this._takePhoto}>
            <Text style={{ fontSize: 20, color: 'white' }}>TAP TO BEGIN</Text>
            <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif' }} />
        </TouchableOpacity>
      </View>
    </View >
    );  
  }
}


class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }

  _maybeRenderImage = () => {
    let { image } = this.props;
    if (!image) {
      return (
        <View
          style={{
            marginTop: 30,
            width: 250,
            elevation: 2,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
          }}>
        <View
          style={{
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={{ width: 150, height: 150, borderRadius: 100 }} />
        </View>

        <Text style={{ color: 'white', fontSize: 20, paddingVertical: 30, paddingHorizontal: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  ANALYZING MOOD</Text>
      </View>

      )
    }
    // IF HAS IMAGE
    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          elevation: 2,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}>
        <View
          style={{
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
        </View>
        <Text style={{ color: 'white', fontSize: 20, paddingVertical: 30, paddingHorizontal: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  ANALYZING MOOD</Text>
      </View>
    );
  };

  _returnState = () => {
    console.log('THIS IS THE STATE');
    console.log(this.props);
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // ------------------------------------------------------
  componentDidMount() {
    setTimeout(() => {
      this.props.setScreen('PLAYLIST');
    }, 15000);
  }

  render() {
    return( 
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <TouchableOpacity onPress={this._returnState()}>
            {this._maybeRenderImage()}
          </TouchableOpacity>
      </View>
    );  
  }
}


// ------------------------------------------------------
// HomeScreen Component: STEP 1
// ------------------------------------------------------
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen};
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  render() {
    return( 
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Text style={{ marginTop: 30, color: 'white', fontSize: 20, padding: 10 }}>YOUR CUSTOM PLAYLIST</Text>
        <Text style={{ color: 'white', paddingHorizontal: 30 }}>Our Artificial Inteligence shows you are 80% Happy and 20% calm today</Text>
        <WebView source={{uri: 'https://open.spotify.com/embed?uri=spotify%3Aalbum%3A2rp5riHULWgrXPsDtsp1ir'}} style={{ marginTop: 20, marginBottom: 30, height:380, width: 300 }}/>
        <TouchableOpacity onPress={this._returnHome}>
          <Text style={{ fontSize: 20, color: 'white', padding: 20, paddingTop: 5 }}>START OVER</Text>
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
});