import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#32a8a8',
  },
  inputView: {
    backgroundColor: '#d3e0e0',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  forgot_button: {
    marginBottom: 20,
  },
});

class Home extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
  };

  constructor() {
    super();
  }

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handleLogin = () => {
    axios.get('http://10.0.2.2:5000/get_user/' + this.state.email).then(response => {


      if( response.data == null)
      {
        alert("email or password is wrong ");
      }
      else if( this.state.password == response.data.password) {
        this.setState({name: response.data.name});

        this.storeData();
        this.props.navigation.navigate('MyTabs');

      }
    });

  };

  storeData = async () => {
    const mail = this.state.email;
    const password1 = this.state.password;
    const username1 = this.state.name;

    try {

      await AsyncStorage.setItem('mail', mail);
      await AsyncStorage.setItem('password', password1);
      await AsyncStorage.setItem('username', username1);

    } catch (e) {
      // saving error
    }
  };

  componentDidMount() {
    this.readStore();
  }

  readStore = async () => {
    try {
      const value1 = await AsyncStorage.getItem('mail');
      const value2 = await AsyncStorage.getItem('password');

      if( value1 == null || value2 == null)
      {
        this.readStore();
      }

      if (value1 !== null && value2 !== null) {
        this.setState({email: value1});
        this.setState({password: value2});
        this.handleLogin();
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
        </View>

        <View style={styles.loginBtn}>
          <Button title="Login" onPress={this.handleLogin} />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.forgot_button}>Create Account? </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password? </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
