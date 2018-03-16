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
    this.props.setError(false);
    this.props.setImage(null);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleFaceImage(pickerResult);
    // let spotifyResponse = await this.spotifyRequest();
    // let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
    // this.props.setPlaylist(playlist)
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

        // let spotifyResponse = await this.spotifyRequest();
        // let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
        // this.props.setPlaylist(playlist)

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

  // async spotifyRequest() {
  //   console.log('THIS IS THE PROPS FROM INSIDE THE SPOTIFY REQUEST FUNCTION HERE!')
  //   console.log(this.props)
  //   console.log(emotionList[0])
  //   let apiUrl = `https://api.spotify.com/v1/search?q=${emotionList[0]}&type=playlist&limit=1`
 
  //   let options = {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: 'Bearer BQD8CEsUS4i3o7_GkMJwblEBEzNqwd12uPiCBc1edfnZ3BNpKdB9SEyw-zui1gkJqKnnWK1yGjKMWBz1OfqpCLTNIbXIM02now_eqTspMebWmt9pDKyxNtPQ6secrG46Jeke8vIkoatWJ6KAmedKBmgy75uD9kn86CE',
  //     }      
  //   }
  //   return fetch(apiUrl, options).then(result => result.json())
  // }

  async recognizeFaceImage(key) {
    let apiUrl = 'https://moodring-nick-pkcfyzfrhm.now.sh/recognize/face?key=' + key;
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

        console.log(uploadResponse);
        recognizeResponse = await this.recognizeEnvironmentImage(uploadResponse.key);   
        console.log(JSON.stringify(recognizeResponse, null, 2));

        let labels = recognizeResponse.data.Labels;

        let labelsList = []
        let labelsPercentage = []
        labels.slice(0, 5).forEach(function(object) {
          labelsList.push(object.Name);
          labelsPercentage.push(object.Confidence);
        });

        // SET EMOTION LIST AND PERCENTAGES AVAILABLE FOR PLAYLIST COMPONENT TO RENDER TEXT
        this.props.setLabels(labelsList)
        this.props.setLabelsPercentage(labelsPercentage)

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
    let apiUrl = 'https://moodring-nick-pkcfyzfrhm.now.sh/recognize/environment?key=' + key
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
    let apiUrl = 'https://moodring-nick-pkcfyzfrhm.now.sh/upload';

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


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <TouchableOpacity onPress={this._takeFacePhoto}>
            <Text style={{color: 'white', fontSize: 20, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>TAP TO BEGIN</Text>
            <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._takeEnvironmentPhoto}>
            <Text>Let's get environ(MENTAL)</Text>
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