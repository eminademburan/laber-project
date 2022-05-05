import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// You can import from local files
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import Settings from './components/Settings.js';
import Tasks from './components/Tasks.js';
import VoiceChat from './components/VoiceChat.tsx';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs(navigation) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="format-list-checkbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Voice Chat"
        component={VoiceChat}
        options={{
          tabBarLabel: 'Voice Chat',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="microphone"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MyTabs" component={MyTabs} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
