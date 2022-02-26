import * as React from 'react';
import { useState, useEffect } from 'react';
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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RadioButton, Text } from 'react-native-paper';
import { Image } from 'react-native';
import Slider from '@react-native-community/slider';

import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    TextInput: {
        flex: 0.1,
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
        width: '50%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
});

class Tasks extends React.Component {
    state = {
        myState: '1',
        data: null,
        data2: null,
    };

    constructor(props: Props) {
        super(props);

        console.log('i am hear');
        axios.get('http://127.0.0.1:5000/incomes').then((response) => {
            console.log(response.data[0]);
            this.setState({ data2: response.data[0].amount });
            this.setState({ myState: '1' });
            console.log('i am in');
        });
    }

    stateChange = () => {
        if (this.state.myState == '1') {
            this.setState({ myState: '2' });
        } else {
            this.setState({ myState: '1' });
        }
    };

    render() {
        if (this.state.myState == '1') {
            return (
                <View style={styles.container}>
                    <View style={styles.bos} />
                    <Image
                        style={styles.stretch}
                        source={require('../assets/twit1.png')}
                    />
                    <Text style={styles.TextInput}>
                        {' '}
                        This is the {this.state.data2} . question with options and it is{' '}
                    </Text>

                    <View style={styles.aralik}>
                        <View style={styles.loginBtn}>
                            <Button title="A" onPress={this.stateChange} />
                        </View>
                        <View style={styles.loginBtn}>
                            <Button title="B" onPress={this.stateChange} />
                        </View>
                    </View>

                    <View style={styles.aralik}>
                        <View style={styles.loginBtn}>
                            <Button title="C" onPress={this.stateChange} />
                        </View>
                        <View style={styles.loginBtn}>
                            <Button title="D" onPress={this.stateChange} />
                        </View>
                    </View>

                    <View style={styles.aralik}>
                        <View style={styles.nextButtonLeft}>
                            <Button title="Previous" onPress={this.stateChange} />
                        </View>
                        <View style={styles.bos} />
                        <View style={styles.nextButtonRight}>
                            <Button title="Next" onPress={this.stateChange} />
                        </View>
                    </View>

                    <View style={styles.bos} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.bos} />
                    <Image
                        style={styles.stretch}
                        source={require('../assets/twit1.png')}
                    />
                    <Text style={styles.TextInput}>
                        {' '}
                        This is the question with options and it is{' '}
                    </Text>

                    <View style={{ flex: 0.2, flexDirection: 'row' }}>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                    </View>

                    <View style={styles.aralik}>
                        <View style={styles.nextButtonLeft}>
                            <Button title="Previous" onPress={this.stateChange} />
                        </View>
                        <View style={styles.bos} />
                        <View style={styles.nextButtonRight}>
                            <Button title="Next" onPress={this.stateChange} />
                        </View>
                    </View>

                    <View style={styles.bos} />
                </View>
            );
        }
    }
}

export default Tasks;
