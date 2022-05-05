import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  CheckBox,
  Component,
  Dimensions,
} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {Image} from 'react-native';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import {FrownOutlined, SmileOutlined} from '@ant-design/icons';
import JSONbigint from 'json-bigint';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import {Props} from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';
import {baseURL} from '../constants';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    flex: 0.2,
    padding: 10,
  },
  stretch: {
    flex: 0.4,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container2: {
    flex: 1.8,
    backgroundColor: '#fff',
  },
  bos: {
    flex: 0.2,
  },
  loginBtn: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#32a8a8',
    height: 90,
    width: 90,
  },
  aralik: {
    flex: 0.2,
    flexDirection: 'row',
  },
  inputView: {
    backgroundColor: '#d3e0e0',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  nextButtonLeft: {
    flex: 0.3,
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 50,
    backgroundColor: '#fc8403',
  },
  nextButtonRight: {
    flex: 0.3,
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 10,
    backgroundColor: '#fc8403',
  },
  forgot_button: {
    marginBottom: 20,
  },
  textCenter: {
    flex: 0.4,
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

class Tasks extends React.Component {
  state = {
    myState: 0,
    tweetUrl: '',
    mail: '',
    tweet_id: 0,
    task_id: null,
    task: null,
    answers: [],
    scalars: null,
    nonscalars: null,
    metricNumbers: 0,
    selectedValue: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      myState: 0,
      tweetUrl: '',
      mail: '',
      tweet_id: 0,
      task_id: null,
      task: null,
      answers: [],
      scalars: null,
      nonscalars: null,
      metricNumbers: 0,
      selectedValue: null,
      channelName: null,
      channelToken: null,
    };
  }

  componentDidMount() {
    setInterval(
      function () {
        this.checkVoiceChat();
      }.bind(this),
      5000,
    );
    this.readStore();
  }

  checkVoiceChat = async () => {
    await axios
      .get(baseURL + '/check_voicechat/' + this.state.mail)
      .then(response => {
        if (response.data == null) {
          console.log('no pending voice chat');
        } else {
          this.setState({
            channelName: response.data.name,
            channelToken: response.data.token,
          });
          console.log(
            'voice chat found, channelName: ' + this.state.channelName,
          );
          console.log('voice chat found, token: ' + this.state.channelToken);
          try {
            AsyncStorage.setItem('channelName', this.state.channelName);
            AsyncStorage.setItem('channelToken', this.state.channelToken);
          } catch (e) {}
        }
      });
  };

  getTweetFromQueue = async () => {
    this.setState({answers: []});
    await axios
      .get(baseURL + '/get_tweet_to_answer/' + this.state.mail)
      .then(response => {
        if (response.data == null) {
          this.setState({myState: 0});
          alert('There is no task in the queue');
        } else {
          this.setState({
            tweet_id: response.data.tweet_id,
            task_id: response.data.task_id,
          });
          axios
            .get(
              baseURL +
                '/get_tweet/' +
                this.state.tweet_id +
                '/' +
                this.state.task_id,
            )
            .then(response => {
              if (response.data == null) {
                this.setState({myState: 0});
              } else {
                const value = response.data.url;
                this.setState({tweetUrl: value});
              }
            });

          axios
            .get(baseURL + '/get_task/' + this.state.task_id)
            .then(response => {
              if (response.data == null) {
                this.setState({myState: 0});
              } else {
                const scalars = response.data.scalarMetrics.length;
                const nonscalars = response.data.nonScalarMetrics.length;

                if (nonscalars > 0) {
                  let temp = this.state.answers;
                  temp[0] = response.data.nonScalarMetrics[0].metricKeys[0];
                  this.setState({
                    myState: 1,
                    answers: temp,
                    selectedValue:
                      response.data.nonScalarMetrics[0].metricKeys[0],
                    metricNumbers: scalars + nonscalars,
                    scalars: response.data.scalarMetrics,
                    nonscalars: response.data.nonScalarMetrics,
                  });
                } else {
                  let temp = this.state.answers;
                  temp[0] = response.data.scalarMetrics[0].min;
                  this.setState({
                    myState: 1,
                    answers: temp,
                    selectedValue: response.data.scalarMetrics[0].min,
                    metricNumbers: scalars + nonscalars,
                    scalars: response.data.scalarMetrics,
                    nonscalars: response.data.nonScalarMetrics,
                  });
                }
              }
            });
        }
      });
  };

  answerQuestion = () => {
    const tempdate = new Date();
    axios
      .post(baseURL + '/add_response', {
        tweet_id: this.state.tweet_id,
        task_id: this.state.task_id,
        mail: this.state.mail,
        answers: this.state.answers,
        date: tempdate,
      })
      .then(response => {
        if (response.data.message == 'failed') {
          this.setState({myState: 0});
        } else {
          this.getTweetFromQueue();
        }
      });
  };

  readStore = async () => {
    try {
      const value = await AsyncStorage.getItem('mail');
      if (value == null) {
        this.readStore();
      } else if (value !== null) {
        this.setState({mail: value});
        this.getTweetFromQueue();
      }
    } catch (e) {
      // error reading value
    }
  };

  stateChange = () => {
    if (this.state.myState < this.state.nonscalars.length) {
      let temp = this.state.answers;
      temp[this.state.myState] =
        this.state.nonscalars[this.state.myState].metricKeys[0];
      this.setState({
        answers: temp,
        selectedValue: this.state.nonscalars[this.state.myState].metricKeys[0],
        myState: this.state.myState + 1,
      });
    } else {
      let temp = this.state.answers;
      temp[this.state.myState] =
        this.state.scalars[
          this.state.myState - this.state.nonscalars.length
        ].min;
      this.setState({
        answers: temp,
        selectedValue:
          this.state.scalars[this.state.myState - this.state.nonscalars.length]
            .min,
        myState: this.state.myState + 1,
      });
    }
  };

  previousstateChange = () => {
    if (this.state.myState != 1) {
      this.setState({myState: this.state.myState - 1});
    }
  };

  setAnswer = text => {
    let temp = this.state.answers;
    temp[this.state.myState - 1] = text;
    this.setState({answers: temp, selectedValue: text});
  };

  getScalars = () => {
    return this.state.scalars;
  };

  getnonScalars = () => {
    return this.state.nonscalars;
  };

  render() {
    if (this.state.myState == 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.textCenter}>Press the button to get task</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.getTweetFromQueue}>
            <Text>Get Task</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      while (this.state.myState <= this.state.metricNumbers) {
        if (this.state.myState <= this.state.nonscalars.length) {
          let items = this.state.nonscalars[
            this.state.myState - 1
          ].metricKeys.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />;
          });
          if (this.state.myState != this.state.metricNumbers) {
            return (
              <View style={styles.container}>

                <View style={styles.container2}>
                  <WebView
                    source={{
                      html:
                        '<blockquote class="twitter-tweet"> <a href="' +
                        this.state.tweetUrl +
                        '"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                    }}
                    javaScriptEnabled={true}
                    style={{
                      flex: 1,
                      width: windowWidth * 1,
                    }}
                    scalesPageToFit={false}
                  />
                </View>
                <Text style={styles.TextInput}>
                  {this.state.nonscalars[this.state.myState - 1].name}.
                </Text>

                <View style={styles.aralik}>
                  <Picker
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setAnswer(itemValue)
                    }
                    style={{height: 50, width: 225}}>
                    {items}
                  </Picker>
                </View>

                <View style={styles.aralik}>
                  <TouchableOpacity
                    style={styles.nextButtonLeft}
                    onPress={this.previousstateChange}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <View style={styles.bos} />
                  <TouchableOpacity
                    style={styles.nextButtonRight}
                    onPress={this.stateChange}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bos} />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={styles.bos} />
                <View style={styles.container2}>
                  <WebView
                    source={{
                      html:
                        '<blockquote class="twitter-tweet"> <a href="' +
                        this.state.tweetUrl +
                        '"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                    }}
                    javaScriptEnabled={true}
                    style={{
                      flex: 1,
                      width: windowWidth * 1,
                    }}
                    scalesPageToFit={false}
                  />
                </View>
                <Text style={styles.TextInput}>
                  {this.state.nonscalars[this.state.myState - 1].name}.
                </Text>

                <View style={styles.aralik}>
                  <Picker
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setAnswer(itemValue)
                    }
                    style={{height: 50, width: 225}}>
                    {items}
                  </Picker>
                </View>

                <View style={styles.aralik}>
                  <TouchableOpacity
                    style={styles.nextButtonLeft}
                    onPress={this.stateChange}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <View style={styles.bos} />
                  <TouchableOpacity
                    style={styles.nextButtonRight}
                    onPress={this.answerQuestion}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bos} />
              </View>
            );
          }
        } else {
          let minValue = parseInt(
            this.state.scalars[
              this.state.myState - this.state.nonscalars.length - 1
            ].min,
          );
          let maxValue = parseInt(
            this.state.scalars[
              this.state.myState - this.state.nonscalars.length - 1
            ].max,
          );

          if (this.state.myState != this.state.metricNumbers) {
            return (
              <View style={styles.container}>
                <View style={styles.bos} />
                <View style={styles.container2}>
                  <WebView
                    source={{
                      html:
                        '<blockquote class="twitter-tweet"> <a href="' +
                        this.state.tweetUrl +
                        '"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                    }}
                    javaScriptEnabled={true}
                    style={{
                      flex: 1,
                      width: windowWidth * 1,
                    }}
                    scalesPageToFit={false}
                  />
                </View>

                <Text style={styles.TextInput}>
                  Determine the{' '}
                  {
                    this.state.scalars[
                      this.state.myState - this.state.nonscalars.length - 1
                    ].name
                  }{' '}
                  of this tweet from {minValue} to {maxValue}
                </Text>

                <View style={{flex: 0.2, flexDirection: 'row'}}>
                  <Text style={styles.title}> {minValue}️</Text>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={someValue => this.setAnswer(someValue)}
                  />
                  <Text style={styles.title}>{maxValue}️</Text>
                </View>

                <View style={styles.aralik}>
                  <TouchableOpacity
                    style={styles.nextButtonLeft}
                    onPress={this.previousstateChange}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <View style={styles.bos} />
                  <TouchableOpacity
                    style={styles.nextButtonRight}
                    onPress={this.stateChange}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bos} />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={styles.bos} />
                <View style={styles.container2}>
                  <WebView
                    source={{
                      html:
                        '<blockquote class="twitter-tweet"> <a href="' +
                        this.state.tweetUrl +
                        '"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                    }}
                    javaScriptEnabled={true}
                    style={{
                      flex: 1,
                      width: windowWidth * 1,
                    }}
                    scalesPageToFit={false}
                  />
                </View>

                <Text style={styles.TextInput}>
                  Determine the{' '}
                  {
                    this.state.scalars[
                      this.state.myState - this.state.nonscalars.length - 1
                    ].name
                  }{' '}
                  of this tweet from {minValue} to {maxValue}
                </Text>

                <View style={{flex: 0.2, flexDirection: 'row'}}>
                  <Text style={styles.title}> {minValue}️</Text>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={someValue => this.setAnswer(someValue)}
                  />
                  <Text style={styles.title}>{maxValue}️</Text>
                </View>

                <View style={styles.aralik}>
                  <TouchableOpacity
                    style={styles.nextButtonLeft}
                    onPress={this.previousstateChange}>
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <View style={styles.bos} />
                  <TouchableOpacity
                    style={styles.nextButtonRight}
                    onPress={this.answerQuestion}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bos} />
              </View>
            );
          }
        }
      }
    }

    return (
      <View>
        <Text style={styles.title}> Hello️</Text>
      </View>
    );
  }
}

export default Tasks;
