import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native';

import Logo from './Logo';
import RegistrationForm from './RegistrationForm';
import * as React from 'react';
import { BASE_URL, MAIN_COLOR } from "../constants";
import axios from "axios";

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
  }

  goBack = () => {
    this.props.navigation.goBack()
  }



  render() {
    return(
      <View style={styles.container}>

        <Logo/>


        <RegistrationForm type="Signup"/>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: MAIN_COLOR,
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }
});
