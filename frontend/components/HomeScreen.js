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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  // FACE EMOTION PHOTO

  _takeFacePhoto = async () => {
    this.props.setSpotifyReturn(false);
    this.props.setEmotionList(false);
    this.props.setError(false);
    this.props.setImage(null);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleFaceImage(pickerResult);
    this.props.setScreen('ANALYZE');
    this.props.setFace(true);
    console.log('Taking Photo');
  };

  _handleFaceImage = async pickerResult => {
    let uploadResponse, uploadResult, recognizeResponse;
    try {
      this.props.setUploading(true);
      if (!pickerResult.cancelled) {
        this.props.setImage(pickerResult.uri);
        uploadResponse = await this.uploadImageAsync(pickerResult.uri);

        console.log(uploadResponse);
        recognizeResponse = await this.recognizeFaceImage(uploadResponse.key);
          // console.log(JSON.stringify(recognizeResponse.data.FaceDetails[0].Emotions));         
        console.log(JSON.stringify(recognizeResponse, null, 2));
        
        // AGE DATA
        let age = recognizeResponse.data.FaceDetails[0].AgeRange.Low;
        this.props.setAge(age);

        // EMOTION DATA
        let emotions = recognizeResponse.data.FaceDetails[0].Emotions;

        let emotionList = []
        let emotionPercentage = []
        emotions.forEach(function(object) {
          emotionList.push(object.Type);
          emotionPercentage.push(object.Confidence);
        });

        // SET EMOTION LIST AND PERCENTAGES AVAILABLE FOR PLAYLIST COMPONENT TO RENDER TEXT
        this.props.setEmotionList(emotionList);
        this.props.setEmotionPercentage(emotionPercentage);
        

        // SET BACKGROUND COLORS USING PROPS
        if (emotionList[0] === 'HAPPY') {
          this.props.setBackgroundColor(['#5161B9', '#9C69CC']);
        } else if (emotionList[0] === 'CALM') {
          this.props.setBackgroundColor(['#0075D1', '#DBE55D']);
        } else if (emotionList[0] === 'SAD') {
          this.props.setBackgroundColor(['#0053CA', '#5DE5D7']);
        } else if (emotionList[0] === 'ANGRY') {
          this.props.setBackgroundColor(['#D10000', '#DBE55D']);
        } else if (emotionList[0] === 'SURPRISED') {
          this.props.setBackgroundColor(['#FF6000', '#D1FF00']);
        } else if (emotionList[0] === 'CONFUSED') {
          this.props.setBackgroundColor(['#067501', '#00A3E3']);
        } 

        let spotifyResponse = await this.spotifyRequestEmotion(emotionList[0]);
        let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
        this.props.setPlaylist(playlist)

      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      console.log('SETTING ERROR');
      this.props.setError(true);
    } finally {
      this.props.setUploading(false);
    }
  };

  async recognizeFaceImage(key) {
    let apiUrl = 'https://moody.now.sh/recognize/face?key=' + key;
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    return fetch(apiUrl, options).then(result => result.json());
  }  

  // PHOTO FOR ENVIRONMENT ANALYSIS

  _takeEnvironmentPhoto = async () => {
    this.props.setError(false);
    this.props.setImage(null);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleEnvironmentImage(pickerResult);
    this.props.setScreen('ANALYZE');
    this.props.setFace(false);
    console.log('Taking Photo');
  };
  

  _handleEnvironmentImage = async pickerResult => {
    let uploadResponse, uploadResult, recognizeResponse, re;
    try {
      this.props.setUploading(true);
      if (!pickerResult.cancelled) {
        this.props.setImage(pickerResult.uri);
        uploadResponse = await this.uploadImageAsync(pickerResult.uri);

        // console.log(uploadResponse);
        recognizeResponse = await this.recognizeEnvironmentImage(uploadResponse.key);   
        console.log(JSON.stringify(recognizeResponse, null, 2));

        let labels = recognizeResponse.data.Labels;

        let labelsList = []
        let garbage =[]
        let labelsPercentage = []
        labels.slice(0, 8).forEach(function(object) {
          if (object.Name === 'Human') {
            garbage.push(object.Name);
          } else if (object.Name === 'Person') {
            garbage.push(object.Name);
          } else if (object.Name === 'People') {
            garbage.push(object.Name);
          } else {
            labelsList.push(object.Name);
            labelsPercentage.push(object.Confidence);
          }
        });

        console.log('---- THIS IS GARBAGE LIST ----')
        console.log(garbage);

        // SET EMOTION LIST AND PERCENTAGES AVAILABLE FOR PLAYLIST COMPONENT TO RENDER TEXT
        this.props.setLabels(labelsList)
        this.props.setLabelsPercentage(labelsPercentage)

        let spotifyResponse = await this.spotifyRequestLabels(labelsList[0]);
        console.log('----- LABELS LIST -------')
        console.log(labelsList);
        console.log('-----SPOTIFY RETURN LIST--------');
        console.log(spotifyResponse);
        let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
        this.props.setPlaylist(playlist)

      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      this.props.setError(true);
    } finally {
      this.props.setUploading(false);
    }
  };

   async recognizeEnvironmentImage(key) {
    let apiUrl = 'https://moody.now.sh/recognize/environment?key=' + key
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    return fetch(apiUrl, options).then(result => result.json());
  }

  // UPLOAD IMAGE ASYNC FUNCTION USED BY BOTH FACE AND ENVIRONMENT

  async uploadImageAsync(uri) {
    let apiUrl = 'https://moody.now.sh/upload';

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
    return fetch(apiUrl, options).then(result => {
      return result.json();
    });
  }

  async spotifyRequestEmotion(emotion) {

    let randomNum = Math.floor(Math.random()*100) + 1;
    console.log('THIS IS THE RANDOM NUMBER FROM INSIDE SPOTIFY PLAYLIST REQUEST: ' + randomNum)
    
    let apiUrl = `https://api.spotify.com/v1/search?q=${emotion}&type=playlist&offset=${randomNum}&limit=1`

    // DEBUG ANALYZE PAGE
    this.props.setSpotifyReturn(true);
 
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }      
    }
    return fetch(apiUrl, options).then(result => result.json())
  }

  async spotifyRequestLabels(input1) {

    let randomNum = Math.floor(Math.random()*100) + 1;
    console.log('THIS IS THE RANDOM NUMBER FROM INSIDE SPOTIFY PLAYLIST REQUEST: ' + randomNum)
    
    // TWO INPUT
    // let apiUrl = `https://api.spotify.com/v1/search?q=${input1}%20${input2}&type=playlist&offset=${randomNum}&limit=1`

    // ONE INPUT
    let apiUrl = `https://api.spotify.com/v1/search?q=${input1}&type=playlist&offset=${randomNum}&limit=1`
 
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }      
    }
    return fetch(apiUrl, options).then(result => result.json())
  }

  render() {
    console.log('-------- THIS IS PROPS AFTER SPOTIFY LOGIN TOKEN ------')
    console.log(this.props)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <TouchableOpacity onPress={this._takeFacePhoto}>
            <Text style={{color: 'white', fontSize: 20, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>TAP TO BEGIN</Text>
            <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._takeEnvironmentPhoto}>
            <Text style={{color: 'white', fontSize: 20, paddingTop: 30}}>TAP TO SCAN ENVIRONMENT</Text>
          </TouchableOpacity>
        </View>
      </View >
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