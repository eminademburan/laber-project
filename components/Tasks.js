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
} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {Image} from 'react-native';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  bos: {
    flex: 0.2,
  },
  loginBtn: {
    flex: 0.5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#32a8a8',
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
  textCenter:{
    flex: 0.4,
    justifyContent: 'center'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

class Tasks extends React.Component {
  state = {
    myState: '0',
    sarcasm: "serious",
    sentiment: 0,
    tweetText: 0,
    mail:"",
    tweet_id: 0,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.readStore();
  }

  getTweetFromQueue= () =>
  {

    axios.get('http://10.0.2.2:5000/get_tweet_to_answer/' + this.state.mail).then(response => {


      if( response.data == null)
      {
        this.setState({myState : '0'});
        alert("There is no task in the queue");
      }
      else{

        this.setState({tweet_id : response.data.tweet_id});
        axios.get('http://10.0.2.2:5000/get_tweet' + "/" +this.state.tweet_id).then(response => {


          if( response.data == null)
          {
            this.setState({myState : '0'});

          }
          else{
            const value = response.data.text;
            this.setState({tweetText : value});
            this.setState({myState : '1'});
          }
        });
      }
    });


  }

  answerQuestion= () =>
  {
    axios.get('http://10.0.2.2:5000/add_response/' + this.state.tweet_id +"/" + this.state.mail + "/" + this.state.sentiment +"/"+this.state.sarcasm).then(response => {


      if( response.data.message == "failed")
      {
        this.setState({myState : '0'});
      }
      else{
        this.getTweetFromQueue();
      }
    });
  }

  readStore = async () => {
    try {
      const value = await AsyncStorage.getItem('mail');
      if( value == null)
      {
        this.readStore();
      }
      else if (value !== null) {
        this.setState({mail: value});
        this.getTweetFromQueue();
      }
    } catch (e) {
      // error reading value
    }
  };

  stateChange = () => {
    if (this.state.myState == '1') {
      this.setState({myState: '2'});
    } else {
      this.setState({myState: '1'});
    }
  };

  setSarcasm  (text) {
    this.setState({sarcasm: text});
  };


  render() {

    if( this.state.myState =='0')
    {
      return(
          <View style={styles.container}>
            <Text style ={styles.textCenter}>Press the button to get task</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={this.getTweetFromQueue}>
              <Text>Get Task</Text>
            </TouchableOpacity>
          </View>
      );
    }
    else if (this.state.myState == '1') {
      return (
        <View style={styles.container}>
          <View style={styles.bos} />
          <Text style={styles.textCenter} adjustsFontSizeToFit numberOfLines={5}>
            {this.state.tweetText}
          </Text>
          <Text style={styles.TextInput}>
            Determine the sarcasm type of this tweet.  {this.state.tweet_id}
          </Text>

          <View style={styles.aralik}>
            <Picker
                selectedValue={this.state.sarcasm}
                onValueChange={(itemValue, itemIndex) =>
                    this.setSarcasm(itemValue)
                }
                style={{  height: 50, width: 225 }}
            >
              <Picker.Item label="Serious" value="serious" />
              <Picker.Item label="Sarcastic" value="sarcastic" />
              <Picker.Item label="Mixed" value="mixed" />
            </Picker>
          </View>

          <View style={styles.aralik}>
            <TouchableOpacity style={styles.nextButtonLeft} onPress={this.stateChange}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <View style={styles.bos} />
            <TouchableOpacity style={styles.nextButtonRight} onPress={this.stateChange} >
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
          <Text style={styles.textCenter} adjustsFontSizeToFit numberOfLines={5}>
            {this.state.tweetText}
          </Text>
          <Text style={styles.TextInput}>
            Determine the sentiment of this tweet from 1 to 10  {this.state.tweet_id}
          </Text>

          <View style={{flex: 0.2, flexDirection: 'row'}}>

            <Text style={styles.title}>☹️</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(someValue) => this.setState({sentiment: someValue})}
            />
            <Text style={styles.title}>☺️</Text>

          </View>

          <View style={styles.aralik}>
            <TouchableOpacity style={styles.nextButtonLeft} onPress={this.stateChange}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <View style={styles.bos} />
            <TouchableOpacity style={styles.nextButtonRight} onPress={this.answerQuestion }>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bos} />
        </View>
      );
    }
  }
}

export default Tasks;
