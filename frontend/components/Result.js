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

  // CHANGES STATE TO PLAYLIST SCREEN
  _returnPlaylist = () => {
    this.props.setScreen('PLAYLIST');
  };


  _dataReturn = () => {

    // EMOTION VARIABLES TOTAL PERCENTAGE
    let emotionPercentageList = this.props.percentage;

    let emotionTotal = emotionPercentageList.reduce(add, 0)

    // LABEL VARIABLES TOTAL PERCENTAGE
    let labelsPercentageList = this.props.labelsPercentage;

    let labelTotal = labelsPercentageList.reduce(add, 0)

    function add(a, b) {
      return a + b;
    }

    // PIE CHART DATA ARRAY
    const data =[]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    // RETURN RESULTS FOR EMOTIONS
    if (this.props.face) {

      data.push(Math.round((this.props.percentage[0]/emotionTotal) * 100 ));
      data.push(Math.round((this.props.percentage[1]/emotionTotal) * 100 ));
      data.push(Math.round((this.props.percentage[2]/emotionTotal) * 100 ));
  
      let pieData = data
          .filter(value => value > 0)
          .map((value, index) => ({
              value,
              svg: {
                  fill: randomColor(),
                  onPress: () => console.log('press', index),
              },
              key: `pie-${index}`,
          }))

      _parsedData = () => {
        return (
        <View>

          <View style={styles.chart}>
              <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
          </View>

          <Text style={styles.data}>
            {this.props.emotions[0]} - {data[0]}%{"\n"}{"\n"}
            {this.props.emotions[1]} - {data[1]}%{"\n"}{"\n"}
            {this.props.emotions[2]} - {data[2]}%{"\n"}{"\n"}
            Estimated Age - {this.props.age}
          </Text>

        </View>
        )
      }

    // RETURN RESULTS FOR LABELS
    } else {

      data.push(Math.round((this.props.labelsPercentage[0]/labelTotal) * 100));
      data.push(Math.round((this.props.labelsPercentage[1]/labelTotal) * 100));
      data.push(Math.round((this.props.labelsPercentage[2]/labelTotal) * 100));
      data.push(Math.round((this.props.labelsPercentage[3]/labelTotal) * 100));
      data.push(Math.round((this.props.labelsPercentage[4]/labelTotal) * 100));

      let pieData = data
          .filter(value => value > 0)
          .map((value, index) => ({
              value,
              svg: {
                  fill: randomColor(),
                  onPress: () => console.log('press', index),
              },
              key: `pie-${index}`,
          }))

      _parsedData = () => {
        return (
        <View>

          <View style={styles.chart}>
              <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
          </View>

          <Text style={styles.data}>
            {this.props.labels[0]} - {data[0]}%{"\n"}{"\n"}
            {this.props.labels[1]} - {data[1]}%{"\n"}{"\n"}
            {this.props.labels[2]} - {data[2]}%{"\n"}{"\n"}
            {this.props.labels[3]} - {data[3]}%{"\n"}{"\n"}
            {this.props.labels[4]} - {data[4]}%{"\n"}{"\n"}
          </Text>

        </View>
        )
      }
    }

    // FUNCTION RETURN WITH MODUAL FOR EMOTION OR LABEL
    return (
      <View>
        {_parsedData()}
      </View>
    )
  }

  // FINAL RENDER
  render() {
    return (
      <View style={styles.container}>
        
        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />

        <View style={styles.title}>
          <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>MOOD RESULTS</Text>
        </View>
        
        {this._dataReturn()}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
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