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
import { PieChart } from 'react-native-svg-charts';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  _returnPlaylist = () => {
    this.props.setScreen('PLAYLIST');
  };


  render() {

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))


    return (
      <View style={styles.container}>
        
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />

        <View style={styles.title}>
          <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>MOOD RESULTS</Text>
        </View>
        
        <View style={styles.chart}>
          <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
        </View>

        <View>
          <Text style={styles.data}>
            Happy - 80 %{"\n"}
            Calm - 20 %{"\n"}
            Surprised - 0 %{"\n"}
            Angry - 0 %{"\n"}
            Sad - 0 %{"\n"}
          </Text>
        </View>

        <TouchableOpacity onPress={this._returnPlaylist}>
          <Text style={styles.button}>BACK TO PLAYLIST</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    top: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  chart: {
  },
  data: {
    color: 'white',
  },
  button: {
    color: 'white',
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  }
});