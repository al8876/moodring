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
  Dimensions
} from 'react-native';
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';
// import { PieChart } from 'react-native-svg-charts';
import resultsBackground from '../assets/results1.jpg';
const { width, height } = Dimensions.get('window');

// IMPORT TEXT PNG
import ResultText from '../assets/resultsText.png'

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  componentDidMount(){
    console.log('RESULT PAGE MOUNT')
    console.log(this.props)
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('--BACKBUTTON HARD HIT--')
      console.log(this.props)
      this.props.setScreen('PLAYLIST');
      console.log('SETTING PREVIOUS PAGE TO: RESULT')
      this.props.setPreviousPage('RESULTS')
    });
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

      // let pieData = data
      //     .filter(value => value > 0)
      //     .map((value, index) => ({
      //         value,
      //         svg: {
      //             fill: randomColor(),
      //             onPress: () => console.log('press', index),
      //         },
      //         key: `pie-${index}`,
      //     }))

      _parsedData = () => {
        return (
        <View style={styles.container}>
          <StatusBar hidden={true} />          

          {/* <View style={styles.chart}>
              <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
          </View> */}

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

      // NEW YEAR NEW ME
      this.props.labelsPercentage.forEach((label) => {
        data.push(Math.round((label/labelTotal) * 100))
      });

      // let pieData = data
      //     .filter(value => value > 0)
      //     .map((value, index) => ({
      //         value,
      //         svg: {
      //             fill: randomColor(),
      //             onPress: () => console.log('press', index),
      //         },
      //         key: `pie-${index}`,
      //     }))

      _parsedData = () => {
        return (
        <View style={styles.container}>
          <StatusBar hidden={true} />          

          {/* <View style={styles.chart}>
              <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
          </View> */}

                {this.props.labels.slice(0, 5).map((value, index) => {
            return(
              <Text key={index} style={styles.data}>
                {value} - {data[index]}%
              </Text>)
          })}

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

        <Image style={{ position: 'absolute', width, height }} source={resultsBackground} />
        <StatusBar hidden={true} />  

        <View >
          <Image source={ResultText} style={styles.resultText} />          
          {this._dataReturn()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  resultText: {
    height: 50,
    width: 150,
    marginTop: 30,
    alignSelf: 'center',
  },
  chart: {
    marginTop: 40,
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
    zIndex: 100,
  }
});