/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React, { Component } from "react";
import {
  Button, Dimensions,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RtcEngine from "react-native-agora";
import styles from "./Style";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { WebView } from "react-native-webview";
import Slider from "@react-native-community/slider";

RtcEngine.create("c1d043e419a6463f8c8775b42807aba7");
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}>
        {children}
      </Text>
    </View>
  );
};

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the mic");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

// Define a Props interface.
interface Props {
}

// Define a State interface.
interface State {
  appId: string;
  token: string;
  channelName: string;
  voicechat_tweet: string;
  voicechat_answer: string;
  joinSucceed: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  peerIds: number[];
}

// Create an App component, which extends the properties of the Pros and State interfaces.
export default class VoiceChat extends Component<Props, State> {
  _engine?: RtcEngine;
  // Add a constructor，and initialize this.state. You need:
  // Replace yourAppId with the App ID of your Agora project.
  // Replace yourChannel with the channel name that you want to join.
  // Replace yourToken with the token that you generated using the App ID and channel name above.
  constructor(props) {
    super(props);
    this.state = {
      appId: "c1d043e419a6463f8c8775b42807aba7",
      token: "",
      channelName: "",
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: false,
      peerIds: []
    };
    if (Platform.OS === "android") {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log("requested!");
      });
    }
  }

  // Other code. See step 5 to step 9.
  // Mount the App component into the DOM.
  componentDidMount() {
    this.init();
    this.readStore();
  }

  readStore = async () => {
    try {
      let name = await AsyncStorage.getItem("channelName");
      let token = await AsyncStorage.getItem("channelToken");
      let voicechat_tweet = await AsyncStorage.getItem("voicechat_tweet");
      let voicechat_answer = await AsyncStorage.getItem("voicechat_answer");
      this.setState({ channelName: String(name), token: String(token), voicechat_tweet: String(voicechat_tweet), voicechat_answer: String(voicechat_answer)
      });
    } catch (e) {
      // error reading value
    }
  };

  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {
    const { appId } = this.state;
    this._engine = await RtcEngine.create(appId);
    // Enable the audio module.
    await this._engine.enableAudio();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener("UserJoined", (uid, elapsed) => {
      console.log("UserJoined", uid, elapsed);
      const { peerIds } = this.state;
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid]
        });
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener("UserOffline", (uid, reason) => {
      console.log("UserOffline", uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid)
      });
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      console.log("JoinChannelSuccess", channel, uid, elapsed);
      this.setState({
        joinSucceed: true
      });
    });
  };

  // Pass in your token and channel name through this.state.token and this.state.channelName.
  // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
  // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
  _joinChannel = async () => {
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0
    );
  };

  // Turn the microphone on or off.
  _switchMicrophone = () => {
    const { openMicrophone } = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({ openMicrophone: !openMicrophone });
      })
      .catch(err => {
        console.warn("enableLocalAudio", err);
      });
  };

  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const { enableSpeakerphone } = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({ enableSpeakerphone: !enableSpeakerphone });
      })
      .catch(err => {
        console.warn("setEnableSpeakerphone", err);
      });
  };

  render() {
    const {
      channelName,
      joinSucceed,
      openMicrophone,
      enableSpeakerphone,
      token
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
         {/* <TextInput
            style={styles.input}
            placeholder={"Channel Name"}
            value={channelName}
          />
          <TextInput style={styles.input} placeholder={"token"} value={token} />*/}
          <Button
            onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
            title={`${joinSucceed ? "Leave" : "Join"} channel`}
          />
        </View>
          <View style={styles.container}>
            <View style={styles.container2}>
              <WebView
                source={{
                  html:
                    "<blockquote class=\"twitter-tweet\"> <a href=\"" + this.state.voicechat_tweet +
                    "\"></a></blockquote> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"
                }}
                javaScriptEnabled={true}
                style={{
                  flex: 1,
                  width: windowWidth * 1
                }}
                scalesPageToFit={false}
              />
            </View>
            <Text style={styles.TextInput}>
              Your Answer: Pro-Amber
            </Text>
          </View>
        <View style={styles.float}>
          <Button
            onPress={this._switchMicrophone}
            title={`Microphone ${openMicrophone ? "on" : "off"}`}
          />
        </View>
      </View>
    );
  }

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };
}
