import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import CountryPicker from 'react-native-country-picker-modal';

const windowWidth = Dimensions.get('screen').width;

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
    width: '35%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginRight: 20,
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
  inputViewForCountry: {
    backgroundColor: '#d3e0e0',
    borderRadius: 30,
    width: windowWidth * (5 / 10),
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputView2: {
    backgroundColor: '#d3e0e0',
    borderRadius: 30,
    width: '35%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  picker: {
    marginTop: 70,
    marginBottom: 70,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    backgroundColor: '#d3e0e0',
    width: windowWidth * (2 / 5),
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
});

class SignUp extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      region: 'US',
    };
  }

  handleEmail1 = text => {
    this.setState({email: text});
  };

  handlePassword1 = text => {
    alert(
      '* The password must contain at least 1 lowercase alphabetical character \n* The password must contain at least 1 uppercase alphabetical character \n* The password must contain at least 1 numeric character' +
        '\n* The password must contain at least one special character \n* The password must be eight characters or longer',
    );
    this.setState({password: text});
  };

  handleName = text => {
    this.setState({name: text});
  };

  handleSurname = text => {
    this.setState({surname: text});
  };

  handlePhone = text => {
    this.setState({phone: text});
  };

  handleAge = text => {
    this.setState({age: text});
  };

  handleLink = text => {
    this.setState({link: text});
  };

  validateUserInfo = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const nameRegex = /[A-Z][a-zA-Z]*/;
    const surnameRegex = /[A-Z][a-zA-Z]*/;
    const phoneRegEx = /^\+[0-9]{2}[0-9]{10}$/;
    const ageRegEx = /^\d{1,2}$/;
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const linkRegEx = /[0-9][0-9][0-9][0-9][0-9][0-9]/;

    if (
      emailRegex.test(this.state.email) &&
      nameRegex.test(this.state.name) &&
      surnameRegex.test(this.state.surname) &&
      phoneRegEx.test(this.state.phone) &&
      ageRegEx.test(this.state.age) &&
      passwordRegEx.test(this.state.password) &&
      (linkRegEx.test(this.state.link) || this.state.link.length == 0)
    ) {
      return true;
    } else if (!nameRegex.test(this.state.name)) {
      alert('Enter an appropriate name');
      return false;
    } else if (!surnameRegex.test(this.state.surname)) {
      alert('Enter an appropriate surname');
      return false;
    } else if (!phoneRegEx.test(this.state.phone)) {
      alert('Enter an appropriate phone number');
      return false;
    } else if (!emailRegex.test(this.state.email)) {
      alert('Enter an appropriate mail');
      return false;
    } else if (!ageRegEx.test(this.state.age)) {
      alert('Enter an appropriate age');
      return false;
    } else if (!passwordRegEx.test(this.state.password)) {
      alert('Enter an appropriate password');
      return false;
    } else if (
      !linkRegEx.test(this.state.link) &&
      !this.state.link.length == 0
    ) {
      alert('Enter an appropriate link');
      return false;
    } else {
      return false;
    }
  };

  handleSignup = () => {
    if (this.validateUserInfo()) {
      axios
        .post(
          'http://laber-env.eba-65gdmegc.us-east-1.elasticbeanstalk.com/add_user',
          {
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            phone: this.state.phone,
            age: this.state.age,
            region: this.state.region,
            language: this.state.language,
            password: this.state.password,
            link: this.state.link,
          },
        )
        .then(response => {
          if (response.data.message == 'success') {
            alert('your account has been created');
            this.props.navigation.navigate('Home');
          } else if (response.data.message == 'failed') {
            alert('your account could not be created');
            this.props.navigation.navigate('SignUp');
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              onChangeText={this.handleName}
            />
          </View>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Surname"
              placeholderTextColor="#003f5c"
              onChangeText={this.handleSurname}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Phone"
            placeholderTextColor="#003f5c"
            onChangeText={this.handlePhone}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email address"
            placeholderTextColor="#003f5c"
            keyboardType={'email-address'}
            onChangeText={this.handleEmail1}
          />
        </View>

        <View style={styles.inputView2}>
          <TextInput
            style={styles.TextInput}
            placeholder="Age"
            placeholderTextColor="#003f5c"
            onChangeText={this.handleAge}
          />
        </View>

        <CountryPicker
          onSelect={value =>
            this.setState({
              country: value,
              region: value.cca2,
              countryName: value.name,
            })
          }
          cca2={this.state.region}
          translation="eng"
          containerButtonStyle={styles.inputViewForCountry}
          visible={this.state.visible}
        />
        {this.state.country && (
          <Text numberOfLines={2} style={styles.data}>
            {this.state.countryName}
          </Text>
        )}

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={this.handlePassword1}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Invitation Link"
            placeholderTextColor="#003f5c"
            onChangeText={this.handleLink}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleSignup}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignUp;
