import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants";

export default class RegistrationForm extends Component {

  state = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    age: '',
    password: '',
    link: '',
    region: 'US',
    countryName: '',
    language: '',
  };

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handleSignup = () => {
    if (true) {
      console.log(this.emailInputRef)
      axios
        .post(BASE_URL + "/add_user", {
          email: this.email,
          password: this.password,

          // name: this.state.name,
          // surname: this.state.surname,
          // phone: this.state.phone,
          // age: this.state.age,
          // region: this.state.region,
          // language: this.state.language,
          // link: this.state.link,
        })
        .then(response => {
          if (response.data.message == "success") {
            alert("your account has been created");
            this.props.navigation.navigate("Home");
          } else if (response.data.message == "failed") {
            alert("your account could not be created");
            this.props.navigation.navigate("SignUp");
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
                   underlineColorAndroid="rgba(0,0,0,0)"
                   placeholder="Email"
                   placeholderTextColor="#ffffff"
                   selectionColor="#fff"
                   keyboardType="email-address"
                   onChangeText={this.handleEmail}
                   onSubmitEditing={() => this.password.focus()} />
        <TextInput style={styles.inputBox}
                   underlineColorAndroid="rgba(0,0,0,0)"
                   placeholder="Password"
                   secureTextEntry={true}
                   placeholderTextColor="#ffffff"
                   onChangeText={this.handlePassword}
                   ref={(input) => this.password = input} />
        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },

});
