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

  _takePhoto = async () => {
    this.props.setImage(null);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleImagePicked(pickerResult);
    this.props.setScreen('ANALYZE'); 
    console.log('Taking Photo');     
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult, recognizeResponse, re;
    try {
      this.props.setUploading(true);
      if (!pickerResult.cancelled) {
        this.props.setImage(pickerResult.uri);
        uploadResponse = await this.uploadImageAsync(pickerResult.uri);

        console.log(uploadResponse);
        recognizeResponse = await this.recognizeImageAsync(uploadResponse.key)
          // console.log(JSON.stringify(recognizeResponse.data.FaceDetails[0].Emotions));         
        console.log(JSON.stringify(recognizeResponse, null, 2))
        let emotions = recognizeResponse.data.FaceDetails[0].Emotions;
        console.log(emotions);

        let emotionList = []
        let emotionPercentage = []
        emotions.forEach(function(object){
          emotionList.push(object.Type)
          emotionPercentage.push(object.Confidence)
        });

        // EMOTION VAIRABLES TO BE PASSED
        let emotion1 = emotionList[0];
        let emotion2 = emotionList[1];
        let emotion3 = emotionList[2];

        let emotion1Percentage = emotionPercentage[0];
        let emotion2Percentage = emotionPercentage[1];
        let emotion3Percentage = emotionPercentage[2];

        // MAKES THE TOP EMOTION AVAILABLE FOR PLAYLIST COMPONENT TO CHANGE COLORS
        this.props.setEmotion(emotion1)

        // SET EMOTION LIST AND PERCENTAGES AVAILABLE FOR PLAYLIST COMPONENT TO RENDER TEXT
        this.props.setEmotionList(emotionList)
        this.props.setEmotionPercentage(emotionPercentage)

        // SET BACKGROUND COLORS USING PROPS
        if (emotion1 === 'HAPPY') {
          this.props.setBackgroundColor(['#5161B9', '#9C69CC']);
        } else if (emotion1 === 'CALM') {
          this.props.setBackgroundColor(['#0075D1', '#DBE55D'])
        } else if (emotion1 === 'SAD') {
          this.props.setBackgroundColor(['#0053CA', '#5DE5D7'])
        } else if (emotion1 === 'ANGRY') {
          this.props.setBackgroundColor(['#D10000', '#DBE55D'])
        } else if (emotion1 === 'SURPRISED') {
          this.props.setBackgroundColor(['#FF6000', '#D1FF00'])
        } else if (emotion1 === 'CONFUSED') {
          this.props.setBackgroundColor(['#067501', '#00A3E3'])
        } 

      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      console.log('SETTING SCREEN STATE TO: ERROR')
      this.props.setImageError(true);     
      alert('Upload failed, sorry :(');
    } finally {
      this.props.setUploading(false);
    }
  };

  async uploadImageAsync(uri) {
    let apiUrl = 'https://moodring-wjodyaeofu.now.sh/upload';

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

  async recognizeImageAsync(key) {
    console.log('THE KEY IN RECOGNIZE ' + key)
    let apiUrl = 'https://moodring-wjodyaeofu.now.sh/recognize?key=' + key
    
    let options = {
      method: 'GET',
      // body: body,
      headers: {
        Accept: 'application/json',
      },
    }
    return fetch(apiUrl, options).then(result => result.json())
  }  

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <TouchableOpacity onPress={this._takePhoto}>
            <Text style={{color: 'white', fontSize: 20, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>TAP TO BEGIN</Text>
            <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif' }} />
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