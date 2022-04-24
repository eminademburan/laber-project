/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import type {Node} from 'react';
import {Platform, Button, TextInput, View, PermissionsAndroid} from 'react-native'

import RtcEngine from 'react-native-agora';

RtcEngine.create('ba7ac75525284f07aee775b2f95e14f3');

import styles from './components/Style'

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};

const requestCameraAndAudioPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
        if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('You can use the mic')
        } else {
            console.log('Permission denied')
        }
    } catch (err) {
        console.warn(err)
    }
}

// Define a Props interface.
interface Props {
}

// Define a State interface.
interface State {
    appId: string,
    token: string,
    channelName: string,
    joinSucceed: boolean,
    openMicrophone: boolean,
    enableSpeakerphone: boolean,
    peerIds: number[],
}

// Create an App component, which extends the properties of the Pros and State interfaces.
export default class App extends Component<Props, State> {
    _engine?: RtcEngine
    // Add a constructor，and initialize this.state. You need:
    // Replace yourAppId with the App ID of your Agora project.
    // Replace yourChannel with the channel name that you want to join.
    // Replace yourToken with the token that you generated using the App ID and channel name above.
    constructor(props) {
        super(props)
        this.state = {
            appId: `ba7ac75525284f07aee775b2f95e14f3`,
            token: '006ba7ac75525284f07aee775b2f95e14f3IAD6AhrsLIj7CJrFDOV9ftHUoc8rEnjouwYCQPikku8En6FK9TsAAAAAEACKbcvB+3dlYgEAAQD6d2Vi',
            channelName: 'baban',
            openMicrophone: true,
            enableSpeakerphone: true,
            joinSucceed: false,
            peerIds: [],
        }
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }
    }

    // Other code. See step 5 to step 9.
    // Mount the App component into the DOM.
    componentDidMount() {
        this.init()
    }

// Pass in your App ID through this.state, create and initialize an RtcEngine object.
    init = async () => {
        const {appId} = this.state
        this._engine = await RtcEngine.create(appId)
        // Enable the audio module.
        await this._engine.enableAudio()


        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)
            const {peerIds} = this.state
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, uid]
                })
            }
        })


        // Listen for the UserOffline callback.
        // This callback occurs when the remote user leaves the channel or drops offline.
        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            const {peerIds} = this.state
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            })
        })

        // Listen for the JoinChannelSuccess callback.
        // This callback occurs when the local user successfully joins the channel.
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            this.setState({
                joinSucceed: true
            })
        })
    }

    // Pass in your token and channel name through this.state.token and this.state.channelName.
// Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
// the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
    _joinChannel = async () => {
        await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
    }

    // Turn the microphone on or off.
    _switchMicrophone = () => {
        const { openMicrophone } = this.state
        this._engine?.enableLocalAudio(!openMicrophone).then(() => {
            this.setState({ openMicrophone: !openMicrophone })
        }).catch((err) => {
            console.warn('enableLocalAudio', err)
        })
    }

// Switch the audio playback device.
    _switchSpeakerphone = () => {
        const { enableSpeakerphone } = this.state
        this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
            this.setState({ enableSpeakerphone: !enableSpeakerphone })
        }).catch((err) => {
            console.warn('setEnableSpeakerphone', err)
        })
    }

    render() {
        const {
            channelName,
            joinSucceed,
            openMicrophone,
            enableSpeakerphone,
        } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ channelName: text })}
                        placeholder={'Channel Name'}
                        value={channelName}
                    />
                    <Button
                        onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
                        title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                    />
                </View>
                <View style={styles.float}>
                    <Button
                        onPress={this._switchMicrophone}
                        title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                    />
                    <Button
                        onPress={this._switchSpeakerphone}
                        title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
                    />
                </View>
            </View>
        )
    }

    _leaveChannel = async () => {
        await this._engine?.leaveChannel()
        this.setState({peerIds: [], joinSucceed: false})
    }
}

